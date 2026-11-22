"""Regenerate committed image/font assets. Requires Pillow, fonttools and brotli."""
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.subset import Options, Subsetter
import json

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'assets'
INK = '#243f35'
ORANGE = '#be4e2d'
BRAND_GREEN = '#3d6d4e'
BRAND_ORANGE = '#c77944'
PAPER = '#f7f6f0'
# Keep the rounded wordmark identical across the website and vector downloads.
wordmark_font = instantiateVariableFont(TTFont(ASSETS / 'outfit-source.ttf', recalcTimestamp=False), {'wght': 650}, inplace=True)
wordmark_font.recalcTimestamp = False
wordmark_font['name'].names = [record for record in wordmark_font['name'].names if record.nameID not in [1,2,3,4,6,16,17,25]]
for name_id, value in [(1,'ARMMATE Wordmark'),(2,'SemiBold'),(3,'ARMMATE Wordmark;650'),(4,'ARMMATE Wordmark SemiBold'),(6,'ARMMATEWordmark-SemiBold'),(16,'ARMMATE Wordmark'),(17,'SemiBold')]:
    wordmark_font['name'].setName(value,name_id,3,1,0x409)
wordmark_font.save(ASSETS/'outfit-wordmark.ttf')
subsetter = Subsetter(options=Options())
subsetter.populate(text='armmate')
subsetter.subset(wordmark_font)
wordmark_font.flavor = 'woff2'
wordmark_font.save(ASSETS/'outfit-wordmark.woff2')

MARK_WIDTH, MARK_HEIGHT = 480, 306
# A symmetric, clean redraw of the supplied two-person / letter-m reference.
PEOPLE_PATH = (
    'M7 263 L111 159 Q118 152 112 144 '
    'C101 133 94 118 94 103 C94 70 120 44 153 44 '
    'C186 44 212 70 212 103 C212 119 206 133 195 144 '
    'Q189 152 196 159 L231 194 Q240 203 249 194 L284 159 '
    'Q291 152 285 144 C274 133 268 119 268 103 '
    'C268 70 294 44 327 44 C360 44 386 70 386 103 '
    'C386 118 379 133 368 144 Q362 152 369 159 L473 263 '
    'C482 273 482 287 473 297 C463 307 448 307 439 297 '
    'L337 195 Q327 185 317 195 L257 255 Q240 272 223 255 '
    'L163 195 Q153 185 143 195 L41 297 '
    'C32 307 17 307 7 297 C-2 287 -2 273 7 263 Z'
)


def mark_svg(primary=BRAND_GREEN, accent=BRAND_ORANGE):
    return (
        f'<path class="brand-people" d="{PEOPLE_PATH}" fill="{primary}" stroke="none"></path>'
        f'<circle class="brand-sun" cx="240" cy="26" r="26" fill="{accent}" stroke="none"></circle>'
    )


def draw_mark(canvas, x, y, width, primary=BRAND_GREEN, accent=BRAND_ORANGE):
    # Supersample the curves so social cards stay as smooth as the SVG logo.
    resolution = 4
    mark_width = round(width)
    mark_height = round(width * MARK_HEIGHT / MARK_WIDTH)
    layer = Image.new('RGBA', (mark_width * resolution, mark_height * resolution))
    scale = mark_width * resolution / MARK_WIDTH
    draw = ImageDraw.Draw(layer)
    import re
    tokens = iter(re.findall(r'[MLCQZ]|-?\d+(?:\.\d+)?', PEOPLE_PATH))
    points = []
    for command in tokens:
        if command == 'Z':
            continue
        count = {'M': 2, 'L': 2, 'Q': 4, 'C': 6}[command]
        values = [float(next(tokens)) for _ in range(count)]
        if command in ['M', 'L']:
            point = tuple(values)
            points.append(point)
        else:
            start = points[-1]
            controls = [tuple(values[i:i+2]) for i in range(0, count, 2)]
            for step in range(1, 41):
                t = step / 40
                if command == 'Q':
                    point = tuple((1-t)**2*start[i]+2*(1-t)*t*controls[0][i]+t*t*controls[1][i] for i in [0,1])
                else:
                    point = tuple((1-t)**3*start[i]+3*(1-t)**2*t*controls[0][i]+3*(1-t)*t*t*controls[1][i]+t**3*controls[2][i] for i in [0,1])
                points.append(point)
    draw.polygon([(round(px*scale), round(py*scale)) for px,py in points], fill=primary)
    draw.ellipse(tuple(round(v*scale) for v in (214,0,266,52)), fill=accent)
    layer = layer.resize((mark_width, mark_height), Image.Resampling.LANCZOS)
    canvas.paste(layer, (round(x), round(y)), layer)


# Vector outlines keep the standalone wordmark independent of installed fonts.
font = TTFont(ASSETS / 'outfit-wordmark.ttf', recalcTimestamp=False)
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()
scale = 98 / font['head'].unitsPerEm
cursor = 200
word_paths = []
for character in 'armmate':
    glyph = cmap[ord(character)]
    pen = SVGPathPen(glyphs)
    glyphs[glyph].draw(TransformPen(pen, (scale, 0, 0, -scale, cursor, 111)))
    word_paths.append(f'<path d="{pen.getCommands()}" fill="{BRAND_GREEN}"/>')
    cursor += font['hmtx'][glyph][0] * scale
logo_width = round(cursor + 20)
(ASSETS / 'logo.svg').write_text(
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {logo_width} 144" '
    'role="img" aria-labelledby="title"><title id="title">ARMMATE</title>'
    f'<g transform="translate(8 22) scale(.333333)">{mark_svg()}</g>{"".join(word_paths)}</svg>\n',
    encoding='utf-8',
)
(ASSETS / 'brand-mark.svg').write_text(
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {MARK_WIDTH} {MARK_HEIGHT}" '
    'role="img" aria-labelledby="title"><title id="title">ARMMATE</title>'
    f'{mark_svg()}</svg>\n', encoding='utf-8',
)
(ASSETS / 'favicon.svg').write_text(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">'
    f'<rect width="64" height="64" rx="14" fill="{PAPER}"/>'
    f'<g transform="translate(4 14) scale(.116667)">{mark_svg()}</g></svg>\n',
    encoding='utf-8',
)
for name in ['manrope-regular', 'manrope-bold', 'armenian-regular', 'armenian-bold']:
    font = TTFont(ASSETS / (name + '.ttf'), recalcTimestamp=False)
    font.flavor = 'woff2'
    font.save(ASSETS / (name + '.woff2'))

# The Armenian language label on EN/RU pages needs only these three glyphs.
# Preserve the full Armenian faces for Armenian prose and language switching.
navigation_font = TTFont(ASSETS / 'armenian-bold.ttf', recalcTimestamp=False)
navigation_subset = Subsetter(options=Options())
navigation_subset.populate(text='ՀԱՅ')
navigation_subset.subset(navigation_font)
navigation_font.flavor = 'woff2'
navigation_font.save(ASSETS / 'armenian-navigation.woff2')
greeting_font = TTFont(ASSETS / 'armenian-regular.ttf', recalcTimestamp=False)
greeting_subset = Subsetter(options=Options())
greeting_subset.populate(text='բարև')
greeting_subset.subset(greeting_font)
greeting_font.flavor = 'woff2'
greeting_font.save(ASSETS / 'armenian-greeting.woff2')

for name in ['ararat', 'yerevan', 'garni', 'dilijan']:
    image = Image.open(ASSETS / (name + '.webp')).convert('RGB')
    widths = [480, 800, 1200] if name == 'ararat' else [480, 800]
    for width in widths:
        if name == 'ararat':
            resized = ImageOps.fit(image, (width, width), method=Image.Resampling.LANCZOS, centering=(.47, .5))
        else:
            resized = image.copy()
            resized.thumbnail((width, 2000), Image.Resampling.LANCZOS)
        resized.save(ASSETS / f'{name}-{width}.webp', quality=82, method=6)

copy = {
    'en':(['Your friend', 'in Armenia.'], 'Your personal assistant in Armenia'),
    'ru':(['Твой друг', 'в Армении.'], 'Твой персональный ассистент в Армении'),
    'hy':(['Քո ընկերը', 'Հայաստանում։'], 'Քո անձնական ասիստենտը Հայաստանում'),
}
for language, (lines, subtitle) in copy.items():
    canvas = Image.new('RGB', (1200, 630), PAPER)
    draw = ImageDraw.Draw(canvas)
    family = 'armenian' if language == 'hy' else 'manrope'
    draw_mark(canvas, 80, 72, 118)
    brand_font = ImageFont.truetype(str(ASSETS/'outfit-wordmark.ttf'), 100)
    draw.text((225, 55), 'armmate', font=brand_font, fill=BRAND_GREEN)
    for index, line in enumerate(lines):
        size = 64
        while True:
            font = ImageFont.truetype(str(ASSETS/f'{family}-bold.ttf'), size)
            if draw.textlength(line, font=font) <= 1030: break
            size -= 1
        draw.text((80, 225 + index*104), line, font=font, fill=INK if index == 0 else ORANGE)
    draw.text((82, 491), subtitle, font=ImageFont.truetype(str(ASSETS/f'{family}-regular.ttf'), 29), fill='#52624f')
    draw.rectangle((0, 597, 1200, 630), fill='#244a3b')
    canvas.save(ASSETS/f'social-armmate-friends-{language}.png', optimize=True)

for size in [16, 32, 48, 180, 192, 512]:
    icon = Image.new('RGB', (size*4, size*4), PAPER)
    draw_mark(icon, size*4*.0625, size*4*.221, size*4*.875)
    icon.resize((size,size),Image.Resampling.LANCZOS).save(ASSETS/f'icon-{size}.png',optimize=True)

Image.open(ASSETS/'icon-512.png').save(ASSETS/'favicon.ico', sizes=[(16,16),(32,32),(48,48),(64,64),(128,128),(256,256)])
avatar = Image.new('RGBA', (1024,1024))
draw_mark(avatar, 92, 244, 840)
avatar.save(ASSETS/'brand-mark.png', optimize=True)

# Transparent horizontal PNG for documents and social profiles.
wordmark = Image.new('RGBA', (logo_width*3, 144*3))
draw_mark(wordmark, 24, 66, 480)
ImageDraw.Draw(wordmark).text((600,333), 'armmate', font=ImageFont.truetype(str(ASSETS/'outfit-wordmark.ttf'),294), fill=BRAND_GREEN, anchor='ls')
wordmark.save(ASSETS/'logo.png', optimize=True)

# A compact stacked lockup follows the supplied reference, with outlined type.
stack_width, stack_height = 720, 600
stacked_paths = []
for text, family, size, baseline, tracking, color in [
    ('armmate', 'outfit-wordmark', 108, 445, 1.5, BRAND_GREEN),
    ('your friend in armenia', 'manrope-regular', 28, 511, 3.5, BRAND_ORANGE),
]:
    face = TTFont(ASSETS/f'{family}.ttf', recalcTimestamp=False)
    face_glyphs, face_cmap = face.getGlyphSet(), face.getBestCmap()
    factor = size / face['head'].unitsPerEm
    width = sum(face['hmtx'][face_cmap[ord(c)]][0]*factor for c in text) + tracking*(len(text)-1)
    position = (stack_width-width)/2
    for char in text:
        glyph = face_cmap[ord(char)]
        pen = SVGPathPen(face_glyphs)
        face_glyphs[glyph].draw(TransformPen(pen,(factor,0,0,-factor,position,baseline)))
        stacked_paths.append(f'<path d="{pen.getCommands()}" fill="{color}"/>')
        position += face['hmtx'][glyph][0]*factor + tracking
(ASSETS/'logo-stacked.svg').write_text(
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {stack_width} {stack_height}" '
    'role="img" aria-labelledby="title"><title id="title">ARMMATE — your friend in Armenia</title>'
    f'<g transform="translate(120 28)">{mark_svg()}</g>{"".join(stacked_paths)}</svg>\n',encoding='utf-8')

credits = json.loads((ASSETS/'credits.json').read_text(encoding='utf-8'))
for credit in credits:
    name = Path(credit['image']).stem
    credit['variants'] = [p.name for p in sorted(ASSETS.glob(name+'-*.webp'))]
    credit['changes'] = 'Resized, converted to WebP; responsive derivatives resized and, for the hero, cropped. Displayed with cropping. Derivatives retain the original image licence.'
(ASSETS/'credits.json').write_text(json.dumps(credits, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
print('Generated ARMMATE vector logos, icons, social cards, WOFF2 fonts and responsive photographs.')

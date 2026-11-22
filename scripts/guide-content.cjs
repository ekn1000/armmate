// Original practical guidance. Source links support destination facts, not
// endorsements of Armmate. Prices, opening hours and transport schedules vary.
const source = (label, url) => ({ label, url });
const section = (title, ...paragraphs) => ({ title, paragraphs });
const tourism = "https://armenia.travel/";
const citySource = source(
  "Armenia Travel: Yerevan",
  tourism + "places-to-go/the-capital-city-of-yerevan/",
);
const planningSource = source(
  "Armenia Travel: a local guide to Yerevan and day trips",
  tourism + "articles/yerevan-locals-guide-to-armenias-capital/",
);
const sevanSource = source(
  "Armenia Travel: Lake Sevan",
  tourism + "articles/what-to-do-in-lake-sevan/",
);
const dilijanSource = source(
  "Armenia Travel: a day in Dilijan",
  tourism + "articles/spending-a-day-in-dilijan-armenia/",
);
const gyumriSource = source(
  "Armenia Travel: a weekend in Gyumri",
  tourism + "articles/a-weekend-in-gyumri/",
);
const monasterySource = source(
  "Armenia Travel: churches and monasteries",
  tourism + "places-to-go/top-churches-monasteries/",
);
const geghardSource = source(
  "UNESCO: Monastery of Geghard and the Upper Azat Valley",
  "https://whc.unesco.org/en/list/960/",
);

module.exports = {
  planning: {
    en: {
      title:
        "Visit Armenia Without a Tour Guide: Planning & Local Help | ARMMATE",
      description:
        "Plan an independent visit to Armenia: choose a base, organise day trips, separate travel costs and use a local assistant when you need practical help.",
      h1: "How to visit Armenia independently, with local support",
      lead: "You can choose your own route and still have someone local to ask. Start with the decisions that shape your stay, then decide whether online help, a companion or a specialist guide would be useful.",
      sections: [
        section(
          "Start with your pace, not a list of attractions",
          "Write down your arrival and departure dates, where you will sleep, and two or three interests. A city walk, a monastery visit and a forest outing need different amounts of walking and travel. Leave room for meals, rest and changes of plan instead of trying to fit every destination into one day.",
          "Choose a base for each part of the trip. Returning to Yerevan after every outing may suit a short visit; a night near a destination can give a longer journey more breathing room. Ask about the return journey before committing to an outbound ride.",
        ),
        section(
          "Decide which kind of help you want",
          "A personal tourist assistant helps with practical decisions: recommendations, reservations, finding transport and communication with local services. An in-person companion joins activities for agreed hours. A specialist guide adds interpretation of a particular subject or site. You can request these separately rather than booking a complete tour.",
          "ARMMATE's primary service is a local assistant on WhatsApp or Telegram. English, Russian and Armenian communication is available. Before arrival you can share your dates and needs to discuss an individual offer; the support period itself is agreed in advance.",
        ),
        section(
          "Separate the budget into clear parts",
          "Keep accommodation, transport, food, admission and any specialist activities separate from the assistance fee. Discuss waiting time, additional stops and the return journey when arranging a driver. Confirm the scope and cost of in-person companionship separately. A recommendation or enquiry does not guarantee a partner's availability.",
          "ARMMATE does not publish fixed packages or calculate a price automatically. Your offer depends on the duration of your stay, expected assistance and optional in-person hours. Confirm the price and terms before paying.",
        ),
        section(
          "Prepare one useful first message",
          "Tell your assistant your dates, approximate base, group size, preferred language, interests and budget. Mention any mobility or dietary needs that should affect recommendations, without sending unnecessary personal documents. Explain which plans are flexible and which reservations are already made.",
          "During the stay, contact your assistant within the agreed service hours. Travel support can help you find an appropriate local service when plans change, but it is not emergency medical or rescue provision. Use the destination guides below to prepare more specific questions.",
        ),
      ],
      faq: [
        [
          "Can I travel in Armenia without hiring a tour guide?",
          "Yes. You can arrange your own itinerary and use local assistance for practical tasks. If you want specialist interpretation at a site, discuss a separate guide rather than assuming companionship includes one.",
        ],
        [
          "Can I get help in English before I arrive?",
          "Yes. Contact ARMMATE in English before arrival to discuss your dates, needs and an individual offer. The service period, contact hours and scope of planning assistance are agreed separately.",
        ],
        [
          "Does hiring an assistant include a driver?",
          "No. Finding and organising transport can be part of the agreed assistance, but the driver, vehicle, tickets and other partner services have separate costs.",
        ],
      ],
      sources: [planningSource],
    },
    ru: {
      title:
        "Самостоятельная поездка в Армению: планирование и помощь | арммейт",
      description:
        "Как самостоятельно спланировать поездку в Армению: выбрать базу, организовать выезды, разделить расходы и обратиться к местному помощнику за поддержкой.",
      h1: "Как путешествовать по Армении самостоятельно с местной поддержкой",
      lead: "Можно выбирать маршрут самому и при этом иметь местного человека для практических вопросов. Сначала определи темп поездки, затем реши, нужна ли онлайн-помощь, компания или отдельный гид.",
      sections: [
        section(
          "Начни с удобного темпа",
          "Запиши даты приезда и отъезда, места ночёвок и два-три главных интереса. Городская прогулка, монастырь и лесной маршрут требуют разного времени и нагрузки. Оставь запас на еду, отдых и изменения планов, вместо попытки посетить всё за один день.",
          "Для каждой части поездки выбери базу. Возвращаться в Ереван после каждого выезда удобно не всегда: иногда ночёвка рядом с направлением делает длинную дорогу спокойнее. Обратный путь лучше обсудить до заказа поездки в одну сторону.",
        ),
        section(
          "Выбери нужный вид помощи",
          "Личный ассистент помогает с рекомендациями, бронированиями, поиском транспорта и общением с местными службами. Сопровождающий присоединяется к занятиям на согласованные часы. Специализированный гид рассказывает о конкретной теме или памятнике. Эти услуги можно обсуждать отдельно.",
          "Основная услуга арммейта — местный ассистент в WhatsApp или Telegram. Можно общаться на русском, английском или армянском. До приезда можно обсудить даты, потребности и индивидуальное предложение; период самой поддержки согласуется заранее.",
        ),
        section(
          "Раздели расходы до подтверждения",
          "Отдельно учитывай жильё, дорогу, питание, входные билеты и специальные занятия. При поиске водителя уточняй ожидание, дополнительные остановки и обратную дорогу. Личное сопровождение также имеет отдельные часы и стоимость. Запрос бронирования не гарантирует наличие мест.",
          "У арммейта нет фиксированных пакетов и автоматического расчёта цены. Предложение зависит от длительности поездки, объёма помощи и часов сопровождения. Стоимость и условия согласуются до оплаты.",
        ),
        section(
          "Что написать ассистенту сначала",
          "Укажи даты, примерное место проживания, число гостей, язык, интересы и бюджет. Сообщи об особенностях передвижения или питания, если они важны для рекомендаций. Не отправляй лишние личные документы; достаточно объяснить, что уже забронировано и что можно изменить.",
          "Во время поездки обращайся в согласованные часы. Ассистент может помочь найти подходящую местную службу при изменении планов, но не заменяет медицинскую или спасательную помощь. Путеводители ниже помогут подготовить вопросы по конкретным направлениям.",
        ),
      ],
      faq: [
        [
          "Можно путешествовать по Армении без экскурсовода?",
          "Да. Можно выбрать собственный маршрут и обращаться за практической местной помощью. Если нужен подробный рассказ о памятнике, отдельного гида следует обсудить заранее.",
        ],
        [
          "Можно написать по-русски до приезда?",
          "Да. Пришли даты и пожелания, чтобы обсудить предложение. Период услуги, часы связи и объём помощи с планированием согласуются отдельно.",
        ],
        [
          "Водитель включён в помощь ассистента?",
          "Нет. Ассистент может помочь найти и организовать транспорт, но водитель, автомобиль, билеты и другие сторонние услуги оплачиваются отдельно.",
        ],
      ],
      sources: [planningSource],
    },
    hy: {
      title:
        "Ինքնուրույն ճանապարհորդություն Հայաստանում․ պլանավորում | արմմեյթ",
      description:
        "Պլանավորիր ինքնուրույն այց Հայաստան․ ընտրիր գիշերակացի վայրը, կազմակերպիր մեկօրյա ուղևորությունները, բաժանիր ծախսերն ու ստացիր տեղական գործնական աջակցություն։",
      h1: "Ինչպես ճանապարհորդել Հայաստանում ինքնուրույն՝ տեղական աջակցությամբ",
      lead: "Կարող ես ընտրել քո երթուղին և միաժամանակ ունենալ տեղացի մարդ, ում կդիմես գործնական հարցերով։ Նախ որոշիր այցիդ տեմպը, հետո՝ առցանց օգնության, ուղեկցի կամ մասնագետ գիդի կարիքը։",
      sections: [
        section(
          "Սկսիր քո տեմպից",
          "Գրի առ ժամանման ու մեկնելու օրերը, գիշերակացի վայրերը և երկու-երեք հիմնական հետաքրքրություն։ Քաղաքային զբոսանքը, վանքի այցն ու անտառային երթուղին տարբեր ժամանակ և քայլելու ծավալ են պահանջում։ Սննդի, հանգստի ու ծրագրի փոփոխության համար ժամանակ թող։",
          "Յուրաքանչյուր հատվածի համար ընտրիր գիշերակացի հիմքը։ Ամեն ուղևորությունից հետո Երևան վերադառնալը միշտ չէ, որ հարմար է․ երբեմն տեղում գիշերելը թույլ է տալիս հանգիստ շարունակել երկար ճանապարհը։ Վերադարձը քննարկիր մինչև մեկ ուղղությամբ մեքենա պատվիրելը։",
        ),
        section(
          "Ընտրիր քեզ անհրաժեշտ օգնությունը",
          "Անձնական ասիստենտն օգնում է խորհուրդների, ամրագրումների, տրանսպորտ գտնելու և տեղական ծառայությունների հետ հաղորդակցման հարցերում։ Ուղեկիցը միանում է համաձայնեցված ժամերին, իսկ մասնագետ գիդը ներկայացնում է կոնկրետ վայրի պատմությունն ու թեման։ Այս տարբերակները կարող ես քննարկել առանձին։",
          "արմմեյթի հիմնական ծառայությունը տեղական առցանց աջակցությունն է WhatsApp-ով կամ Telegram-ով։ Հաղորդակցությունը հնարավոր է հայերեն, ռուսերեն ու անգլերեն։ Մինչև ժամանումը կարող ես քննարկել օրերդ, կարիքներդ ու անհատական առաջարկը․ աջակցության ժամկետը համաձայնեցվում է նախապես։",
        ),
        section(
          "Ծախսերը բաժանիր մինչև հաստատումը",
          "Կացությունը, ճանապարհը, սնունդը, մուտքի տոմսերն ու հատուկ զբաղմունքները հաշվի առ առանձին։ Վարորդի հետ ճշտիր սպասելու ժամանակը, կանգառներն ու վերադարձը։ Անձնական ուղեկցման ժամերն ու արժեքը նույնպես համաձայնեցվում են առանձին։ Հարցումը դեռ չի նշանակում երրորդ կողմի ծառայության հաստատում։",
          "Ֆիքսված փաթեթներ կամ ավտոմատ գնահաշվարկ չկան։ Առաջարկը կախված է այցի տևողությունից, աջակցության ծավալից և ուղեկցման ժամերից։ Մինչև վճարելը համաձայնեցրու արժեքն ու պայմանները։",
        ),
        section(
          "Ինչ գրել առաջին հաղորդագրության մեջ",
          "Նշիր օրերդ, գիշերակացի մոտավոր վայրը, մարդկանց քանակը, նախընտրած լեզուն, հետաքրքրություններն ու բյուջեն։ Եթե տեղաշարժի կամ սննդի առանձնահատկությունները ազդում են խորհուրդների վրա, պատմիր դրանց մասին՝ առանց ավելորդ անձնական փաստաթղթեր ուղարկելու։ Ասա՝ ինչն է արդեն ամրագրված, իսկ ինչը կարելի է փոխել։",
          "Այցի ընթացքում դիմիր համաձայնեցված ժամերին։ Ասիստենտը կարող է օգնել գտնել համապատասխան տեղական ծառայություն, բայց չի փոխարինում բժշկական կամ փրկարարական օգնությանը։ Ստորև ուղղությունների ուղեցույցներն օգնում են նախապատրաստել ավելի կոնկրետ հարցեր։",
        ),
      ],
      faq: [
        [
          "Կարո՞ղ եմ Հայաստանում ճանապարհորդել առանց գիդի։",
          "Այո։ Կարող ես ընտրել քո երթուղին և օգտվել գործնական տեղական աջակցությունից։ Վայրի մասին մասնագիտական պատմության համար առանձին գիդի կարիքը քննարկիր նախապես։",
        ],
        [
          "Կարո՞ղ եմ անգլերեն օգնություն քննարկել մինչև ժամանելը։",
          "Այո։ Նախապես ուղարկիր օրերդ ու կարիքներդ։ Ծառայության ժամկետը, կապի ժամերն ու պլանավորման աջակցության ծավալը կհամաձայնեցնենք առանձին։",
        ],
        [
          "Վարորդը ներառվա՞ծ է ասիստենտի աջակցությունում։",
          "Ոչ։ Կարող ենք օգնել գտնել և կազմակերպել փոխադրումը, բայց վարորդը, մեքենան, տոմսերն ու երրորդ կողմի ծառայություններն ունեն առանձին արժեք։",
        ],
      ],
      sources: [planningSource],
    },
  },
  yerevan: {
    en: {
      title: "Local Travel Help in Yerevan: Plan Your First Days | ARMMATE",
      description:
        "Plan your first days in Yerevan with practical tips on walking routes, reservations and local communication, plus optional personal assistance from ARMMATE.",
      h1: "Local help in Yerevan: a practical first-days guide",
      lead: "Yerevan is a useful starting point for an independent visit. Build a city day around nearby places and realistic walking distances, then use a local assistant for the practical details you want help with.",
      sections: [
        section(
          "Group your city stops into a comfortable walk",
          "Republic Square, the Opera area and Cascade give you different ways to explore central Yerevan. Select a small cluster rather than crossing the centre repeatedly. Cascade involves changes of level, so discuss steps and access if these affect your plans. Add time for a café or a museum instead of treating every stop as a photo break.",
          "Choose a meeting place that both you and a companion can identify, such as a named entrance. A map pin and a short description are more useful than only naming a large square. Share your preferred walking pace when asking for recommendations.",
        ),
        section(
          "Make food and culture fit your timing",
          "Check a restaurant's current opening hours and reserve if you have a particular place or group size in mind. Tell the assistant about dietary requirements before choosing a venue. Museums, performances and seasonal markets have their own schedules; an online listing does not confirm a ticket or table for your date.",
          "Keep a flexible indoor alternative for very hot, cold or wet weather. Your local assistant can help compare nearby options, communicate a reservation request or find an appropriate service when the first plan changes.",
        ),
        section(
          "Use one contact for everyday decisions",
          "A local assistant in Yerevan can help with restaurant choices, finding a taxi or driver, shopping questions and communication with local services. ARMMATE's main support is online through WhatsApp or Telegram during the agreed hours. You keep control of where you go and what you book.",
          "For a walk, shopping or company in a café, ask about in-person companionship. State the meeting point, activities and expected finish time. Companionship and any specialist guided interpretation are separate arrangements, not an unlimited part of online assistance.",
        ),
        section(
          "Use the city as a base for selected outings",
          "Choose a day trip by interest rather than adding every nearby destination to one route. Garni and Geghard are a cultural outing; Lake Sevan is a different landscape and journey. Confirm transport, waiting time and the return before setting off. Driver fees, admission and meals remain separate from the assistance fee.",
        ),
      ],
      faq: [
        [
          "Can I request help for just my first day in Yerevan?",
          "Tell ARMMATE your dates and the tasks you need help with. The service period and individual price are discussed before confirmation; there is no mandatory fixed package.",
        ],
        [
          "Can someone walk around Yerevan with me?",
          "You can request a personal companion for selected hours and activities. The meeting point, availability and cost are agreed separately from online support.",
        ],
        [
          "Do I have to follow a fixed city tour?",
          "No. You choose the pace and activities. Practical accompaniment does not automatically include specialist guiding, transport or admission.",
        ],
      ],
      sources: [citySource, planningSource],
    },
    ru: {
      title: "Местная помощь в Ереване: первые дни и прогулки | арммейт",
      description:
        "Спланируй первые дни в Ереване: удобные прогулки, кафе, бронирования и общение с местными службами. Личная поддержка и сопровождение по договорённости.",
      h1: "Практическая помощь в Ереване в первые дни поездки",
      lead: "Ереван удобен как отправная точка самостоятельного путешествия. Собери день из расположенных рядом мест и реалистичных прогулок, а организационные вопросы обсуди с местным ассистентом.",
      sections: [
        section(
          "Собери удобную городскую прогулку",
          "Площадь Республики, район Оперы и Каскад предлагают разные впечатления от центра. Выбери несколько соседних остановок, чтобы не пересекать город многократно. На Каскаде есть перепады высоты: если важны ступени и доступность, обсуди их заранее. Оставь время на кафе или музей.",
          "Для встречи с сопровождающим выбери понятное место, например конкретный вход. Точка на карте и короткое описание полезнее названия большой площади. Сообщи желаемый темп и продолжительность прогулки.",
        ),
        section(
          "Подстрой еду и культуру под свой день",
          "Проверь актуальные часы ресторана и забронируй стол, если важны конкретное место или размер компании. О пищевых потребностях расскажи до выбора заведения. У музеев, спектаклей и сезонных рынков свои расписания; наличие информации в интернете ещё не подтверждает билет на нужную дату.",
          "Для жары, холода или дождя оставь вариант в помещении. Местный ассистент поможет сравнить ближайшие места, передать запрос на бронирование или найти другую услугу, если планы изменились.",
        ),
        section(
          "Один контакт для повседневных задач",
          "Ассистент в Ереване может помочь выбрать ресторан, найти такси или водителя, решить вопрос с покупками и общением. Основная поддержка арммейта — через WhatsApp или Telegram в согласованные часы. Решение, куда идти и что бронировать, остаётся за тобой.",
          "Для прогулки, покупок или компании в кафе можно запросить личное сопровождение. Укажи место встречи, занятия и время завершения. Сопровождение и профессиональный экскурсовод согласуются отдельно от онлайн-поддержки.",
        ),
        section(
          "Выбери отдельный день для выезда",
          "Сравни поездки по интересам, а не пытайся собрать все направления в один маршрут. Гарни и Гегард подходят для культурного выезда, а Севан — для другого пейзажа и программы. До отправления согласуй транспорт, ожидание и возвращение. Водитель, билеты и питание имеют отдельную стоимость.",
        ),
      ],
      faq: [
        [
          "Можно попросить помощь только на первый день в Ереване?",
          "Пришли даты и список задач. Период услуги и индивидуальная стоимость обсуждаются до подтверждения; обязательного фиксированного пакета нет.",
        ],
        [
          "Кто-то может погулять со мной по Еревану?",
          "Можно запросить личного сопровождающего на выбранные часы и занятия. Место встречи, доступность и цена согласуются отдельно.",
        ],
        [
          "Нужно следовать готовому городскому туру?",
          "Нет. Ты выбираешь темп и занятия. Практическое сопровождение не включает автоматически гида, транспорт или входные билеты.",
        ],
      ],
      sources: [citySource, planningSource],
    },
    hy: {
      title: "Տեղական օգնություն Երևանում․ առաջին օրերի ուղեցույց | արմմեյթ",
      description:
        "Պլանավորիր առաջին օրերդ Երևանում՝ հարմար զբոսանք, սրճարաններ, ամրագրումներ և տեղական հաղորդակցում։ Անձնական աջակցություն ու ուղեկցում՝ պայմանավորվածությամբ։",
      h1: "Գործնական տեղական օգնություն Երևանում՝ այցիդ առաջին օրերին",
      lead: "Երևանը հարմար մեկնարկ է ինքնուրույն ճանապարհորդության համար։ Օրդ կառուցիր իրար մոտ վայրերի ու իրատեսական քայլելու հեռավորությունների շուրջ, իսկ կազմակերպչական հարցերը քննարկիր տեղացի ասիստենտի հետ։",
      sections: [
        section(
          "Ընտրիր հարմար քաղաքային զբոսանք",
          "Հանրապետության հրապարակը, Օպերայի շրջակայքն ու Կասկադը կենտրոնի տարբեր կողմերն են բացում։ Ընտրիր մի քանի մոտ կանգառ, որպեսզի բազմիցս չանցնես ամբողջ կենտրոնը։ Կասկադում բարձրության փոփոխություն կա․ եթե աստիճաններն ու հասանելիությունը կարևոր են, նախապես քննարկիր դրանք։ Ժամանակ թող սրճարանի կամ թանգարանի համար։",
          "Ուղեկցի հետ հանդիպման համար ընտրիր հստակ տեղ, օրինակ՝ կոնկրետ մուտք։ Քարտեզի կետն ու կարճ նկարագրությունն ավելի օգտակար են, քան միայն մեծ հրապարակի անունը։ Նշիր քայլելու նախընտրած տեմպն ու տևողությունը։",
        ),
        section(
          "Սնունդն ու մշակույթը հարմարեցրու օրվան",
          "Ճշտիր ռեստորանի ընթացիկ ժամերը և ամրագրիր, եթե կարևոր է կոնկրետ վայրը կամ խմբի չափը։ Սննդային պահանջները փոխանցիր նախքան վայր ընտրելը։ Թանգարանները, ներկայացումներն ու սեզոնային շուկաներն ունեն իրենց գրաֆիկը․ առցանց տեղեկությունը դեռ չի հաստատում տոմսը կամ սեղանը։",
          "Շոգի, ցրտի կամ անձրևի համար փակ տարածքի այլընտրանք պահիր։ Ասիստենտը կարող է համեմատել մոտակա տարբերակները, փոխանցել ամրագրման հարցումը կամ օգնել նոր տարբերակ գտնել։",
        ),
        section(
          "Մեկ կապ՝ առօրյա հարցերի համար",
          "Երևանում ասիստենտը կարող է օգնել ռեստորան ընտրել, տաքսի կամ վարորդ գտնել, գնումների հարց պարզել ու հաղորդակցվել տեղական ծառայությունների հետ։ Հիմնական աջակցությունը WhatsApp-ով կամ Telegram-ով է՝ համաձայնեցված ժամերին։ Որտեղ գնալն ու ինչ ամրագրելը որոշում ես դու։",
          "Զբոսանքի, գնումների կամ սրճարանում ընկերակցության համար խնդրիր անձնական ուղեկցում։ Նշիր հանդիպման վայրը, զբաղմունքն ու ավարտի ժամը։ Ուղեկցումն ու մասնագիտական գիդի ծառայությունը առանձին են առցանց աջակցությունից։",
        ),
        section(
          "Քաղաքից դուրս այցի համար առանձին օր ընտրիր",
          "Ուղղությունները համեմատիր ըստ հետաքրքրության, ոչ թե ամեն ինչ նույն երթուղու մեջ տեղավորելու ցանկության։ Գառնին ու Գեղարդը մշակութային այց են, իսկ Սևանը՝ այլ բնապատկեր ու ճանապարհ։ Մինչև մեկնելը ճշտիր փոխադրումը, սպասելն ու վերադարձը։ Վարորդը, մուտքի տոմսերն ու սնունդն ունեն առանձին արժեք։",
        ),
      ],
      faq: [
        [
          "Կարո՞ղ եմ օգնություն խնդրել միայն Երևանում առաջին օրվա համար։",
          "Ուղարկիր օրերդ ու անհրաժեշտ գործերը։ Ժամկետն ու անհատական արժեքը քննարկվում են մինչև հաստատումը․ պարտադիր ֆիքսված փաթեթ չկա։",
        ],
        [
          "Կարո՞ղ է մեկը Երևանում ինձ հետ զբոսնել։",
          "Կարող ես ուղեկից խնդրել ընտրված ժամերի ու զբաղմունքների համար։ Հանդիպման վայրը, հասանելիությունն ու գինը համաձայնեցվում են առանձին։",
        ],
        [
          "Պե՞տք է հետևեմ պատրաստի քաղաքային տուրի։",
          "Ոչ։ Տեմպն ու զբաղմունքները ընտրում ես դու։ Գործնական ուղեկցումը ինքնաբերաբար չի ներառում մասնագետ գիդ, տրանսպորտ կամ մուտքի տոմսեր։",
        ],
      ],
      sources: [citySource, planningSource],
    },
  },
  garni: {
    en: {
      title: "Garni and Geghard Independently: Transport & Planning | ARMMATE",
      description:
        "Plan a visit to Garni and Geghard with clear transport questions, walking considerations and time for each site. Ask ARMMATE for practical local support.",
      h1: "Visit Garni and Geghard at your own pace",
      lead: "Garni's temple and Geghard's monastery are separate places with different settings. Plan the journey between them and your return, rather than treating the names as one stop on a map.",
      sections: [
        section(
          "Give the two sites different kinds of time",
          "Garni is known for its classical temple, while Geghard's monastic complex includes rock-cut spaces and is part of a UNESCO World Heritage site. A specialist guide can add historical interpretation; a personal assistant can help you organise the practical visit. Decide in advance whether you want one, both or just a relaxed outing.",
          "At a working religious site, follow local guidance about clothing, photography and services. Check current access arrangements before relying on an exact timetable. Your assistant can help ask a practical question, but cannot guarantee access to every area.",
        ),
        section(
          "Agree the whole journey with your driver",
          "Discuss pickup, both destinations, any meal stop, waiting time and return to your accommodation. A ride to the first site is not automatically a full-day arrangement. If you prefer to make your own transport arrangements, check how you will continue between stops and get back before leaving.",
          "Keep the transport payment separate from ARMMATE's fee. Tell the assistant your group size, any child-seat requirements and mobility needs so suitable options can be checked. Do not assume a quoted vehicle includes every additional stop.",
        ),
        section(
          "Treat the gorge as a separate choice",
          "The Garni area also offers the Azat Gorge landscape and basalt formations often called the Symphony of Stones. Adding a gorge visit changes walking, access and timing; it is not simply another room at the temple. Ask about the current route and whether it suits your footwear, mobility and available time.",
          "A shorter visit to the main sites may be more comfortable than combining the gorge, a long meal and multiple additional attractions. Keep water, weather-appropriate clothing and time for the return in your plan.",
        ),
        section(
          "How ARMMATE can help with this outing",
          "Send your preferred day, base, interests and walking preferences. Your assistant can help compare the order of stops, find a driver, discuss a reservation and communicate with local providers. Optional personal companionship and specialist guiding are agreed separately, subject to availability. Admission, transport, meals and partner services are additional expenses.",
        ),
      ],
      faq: [
        [
          "Are Garni and Geghard the same place?",
          "No. They are separate sites. Allow for travel between them, time at each place and a confirmed return journey.",
        ],
        [
          "Can I visit without joining a group tour?",
          "Yes. You can make an independent plan and ask for practical assistance with transport or communication. A driver, companion or specialist guide is arranged and priced separately.",
        ],
        [
          "Is a gorge walk included automatically?",
          "No. A gorge visit adds its own access and walking considerations. Discuss whether it suits your plans before adding it to the journey.",
        ],
      ],
      sources: [planningSource, geghardSource],
    },
    ru: {
      title: "Гарни и Гегард самостоятельно: дорога и план визита | арммейт",
      description:
        "Подготовь самостоятельную поездку в Гарни и Гегард: транспорт между остановками, обратная дорога, прогулки и местная практическая помощь от арммейта.",
      h1: "Гарни и Гегард в собственном темпе",
      lead: "Храм Гарни и монастырь Гегард — разные места. Заранее спланируй дорогу между ними и возвращение, а для каждого памятника оставь время с учётом своих интересов.",
      sections: [
        section(
          "Отведи время каждому памятнику",
          "Гарни известен классическим храмом, а комплекс Гегард включает высеченные в скале помещения и входит в объект Всемирного наследия ЮНЕСКО. Профессиональный гид может раскрыть историю, а личный ассистент — помочь организовать сам визит. Выбери нужный формат заранее.",
          "В действующем религиозном месте соблюдай местные указания об одежде, съёмке и богослужениях. Перед поездкой уточни актуальный доступ. Ассистент поможет задать практический вопрос, но не гарантирует вход во все помещения.",
        ),
        section(
          "Согласуй с водителем весь маршрут",
          "Обсуди встречу, оба памятника, остановку на обед, ожидание и возвращение к месту проживания. Поездка до первой точки не означает автоматически обслуживание на весь день. При самостоятельном выборе транспорта проверь продолжение маршрута и обратную дорогу.",
          "Оплата транспорта отделяется от стоимости арммейта. Укажи число гостей, потребность в детском кресле и особенности передвижения, чтобы можно было уточнить подходящие варианты. Дополнительные остановки не следует считать включёнными без согласования.",
        ),
        section(
          "Ущелье — отдельная часть плана",
          "В окрестностях Гарни находится ущелье Азат с базальтовыми образованиями, известными как «Симфония камней». Его посещение меняет нагрузку, доступ и продолжительность поездки. Уточни актуальный путь и его соответствие обуви, мобильности и оставшемуся времени.",
          "Спокойный визит к двум главным памятникам иногда удобнее маршрута с ущельем, долгим обедом и множеством остановок. Оставь время на возвращение и подготовь воду и одежду по погоде.",
        ),
        section(
          "Чем может помочь арммейт",
          "Пришли желаемый день, место проживания, интересы и предпочтения по ходьбе. Ассистент поможет обсудить порядок остановок, найти водителя и связаться с местными поставщиками. Личный сопровождающий и специализированный гид согласуются отдельно, с учётом доступности. Билеты, транспорт и питание имеют отдельную стоимость.",
        ),
      ],
      faq: [
        [
          "Гарни и Гегард находятся в одном месте?",
          "Нет. Это отдельные памятники. Нужны время на дорогу между ними, посещение каждого и согласованное возвращение.",
        ],
        [
          "Можно поехать без групповой экскурсии?",
          "Да. Можно выбрать собственный план и попросить практическую помощь с дорогой или общением. Водитель, сопровождающий и гид обсуждаются и оплачиваются отдельно.",
        ],
        [
          "Прогулка по ущелью входит автоматически?",
          "Нет. У неё свои условия доступа и пешая нагрузка. Сначала обсуди, подходит ли она твоим планам.",
        ],
      ],
      sources: [planningSource, geghardSource],
    },
    hy: {
      title: "Գառնի և Գեղարդ՝ ինքնուրույն այցի պլանավորում | արմմեյթ",
      description:
        "Պատրաստիր ինքնուրույն այց Գառնի և Գեղարդ․ ճշտիր կանգառների միջև տրանսպորտը, վերադարձը, քայլելու ծավալն ու անհրաժեշտ տեղական գործնական աջակցությունը։",
      h1: "Այցելիր Գառնի և Գեղարդ քո տեմպով",
      lead: "Գառնիի տաճարն ու Գեղարդի վանքը առանձին վայրեր են։ Նախապես պլանավորիր նրանց միջև ճանապարհն ու վերադարձը, իսկ յուրաքանչյուր կանգառի համար ժամանակ թող՝ ըստ հետաքրքրություններիդ։",
      sections: [
        section(
          "Յուրաքանչյուր վայրին առանձին ժամանակ տուր",
          "Գառնին հայտնի է դասական տաճարով, իսկ Գեղարդի վանական համալիրը ներառում է ժայռափոր տարածքներ և ՅՈՒՆԵՍԿՕ-ի համաշխարհային ժառանգության մաս է։ Մասնագետ գիդը կարող է պատմական բովանդակություն ներկայացնել, իսկ ասիստենտը՝ կազմակերպել գործնական այցը։ Նախ որոշիր՝ որ ձևաչափն է քեզ պետք։",
          "Գործող կրոնական վայրում հետևիր հագուստի, լուսանկարելու և արարողությունների տեղական ցուցումներին։ Մինչև մեկնելը ճշտիր մուտքի ընթացիկ պայմանները։ Ասիստենտը կարող է հարցում անել, բայց չի երաշխավորում բոլոր տարածքների հասանելիությունը։",
        ),
        section(
          "Վարորդի հետ համաձայնեցրու ամբողջ ճանապարհը",
          "Քննարկիր վերցնելու վայրը, երկու հուշարձանները, հնարավոր ճաշի կանգառը, սպասելն ու գիշերակաց վերադարձը։ Առաջին վայր հասնելը ինքնաբերաբար ամբողջ օրվա փոխադրում չէ։ Եթե տրանսպորտն ինքնուրույն ես ընտրում, նախ պարզիր՝ ինչպես ես շարունակելու և վերադառնալու։",
          "Տրանսպորտի վճարն առանձին է արմմեյթի ծառայությունից։ Նշիր մարդկանց քանակը, մանկական նստատեղի կարիքը և տեղաշարժի առանձնահատկությունները։ Լրացուցիչ կանգառները ներառված մի համարիր առանց համաձայնության։",
        ),
        section(
          "Ձորը ծրագրի առանձին ընտրություն է",
          "Գառնիի տարածքում է նաև Ազատի կիրճը՝ «Քարերի սիմֆոնիա» անունով հայտնի բազալտե սյուներով։ Ձորի այցը փոխում է հասանելիությունը, քայլելու ծավալն ու օրվա տևողությունը։ Ճշտիր ընթացիկ ճանապարհը և դրա համապատասխանությունը քո կոշիկներին, տեղաշարժին ու ժամանակին։",
          "Երբեմն երկու հիմնական վայրի հանգիստ այցն ավելի հարմար է, քան ձորը, երկար ճաշն ու բազմաթիվ կանգառները նույն օրվա մեջ ներառելը։ Հաշվի առ ջուրը, եղանակին համապատասխան հագուստն ու վերադարձի ժամանակը։",
        ),
        section(
          "Ինչով կօգնի արմմեյթը",
          "Գրիր ցանկալի օրը, գիշերակացի վայրը, հետաքրքրություններն ու քայլելու նախասիրությունները։ Ասիստենտը կօգնի քննարկել կանգառների հերթականությունը, վարորդ գտնել և հաղորդակցվել տեղական ծառայությունների հետ։ Անձնական ուղեկիցն ու մասնագետ գիդը համաձայնեցվում են առանձին՝ ըստ հասանելիության։ Տոմսերը, ճանապարհն ու սնունդն ունեն առանձին արժեք։",
        ),
      ],
      faq: [
        [
          "Գառնին ու Գեղարդը նո՞ւյն վայրում են։",
          "Ոչ։ Դրանք առանձին վայրեր են։ Հաշվի առ նրանց միջև ճանապարհը, յուրաքանչյուրի այցի ժամանակը և համաձայնեցված վերադարձը։",
        ],
        [
          "Կարո՞ղ եմ գնալ առանց խմբային տուրի։",
          "Այո։ Կարող ես ընտրել քո ծրագիրը և գործնական օգնություն խնդրել ճանապարհի կամ հաղորդակցման հարցերում։ Վարորդը, ուղեկիցն ու գիդը քննարկվում ու վճարվում են առանձին։",
        ],
        [
          "Ձորի զբոսանքն ինքնաբերաբար ներառվա՞ծ է։",
          "Ոչ։ Այն ունի հասանելիության և քայլելու առանձին պայմաններ։ Նախ քննարկիր՝ արդյոք համապատասխանում է քո ծրագրին։",
        ],
      ],
      sources: [planningSource, geghardSource],
    },
  },
  sevan: {
    en: {
      title:
        "Lake Sevan Independently: Choose a Shore and Plan Your Day | ARMMATE",
      description:
        "Choose a Lake Sevan stop around your interests, walking needs and season. Plan a return ride, check local arrangements and request practical travel assistance.",
      h1: "Plan a Lake Sevan visit around the experience you want",
      lead: "A monastery viewpoint, a lakeside meal and time at the water are different plans. Lake Sevan covers a large area, so pick a particular shore or stop before arranging a ride.",
      sections: [
        section(
          "Choose a specific lakeside destination",
          "Start by deciding whether the day is about scenery, a cultural visit, food or time by the water. Sevanavank is a well-known viewpoint above the lake, but visiting it is not the same as choosing a beach. Ask about steps and access if you need a route with less climbing.",
          "Check a proposed stop on a map rather than relying on the general label 'Lake Sevan'. Different stretches of shore can change the road journey, facilities and time available. A short list of priorities is more useful than a plan to see the entire lake in one outing.",
        ),
        section(
          "Plan for the season and the return journey",
          "Waterfront conditions, weather and the operation of seasonal businesses can affect the day. A summer description does not confirm that a venue or activity is operating for your dates. Keep a warmer layer and an alternative plan when the forecast or conditions do not suit your original choice.",
          "When arranging transport, agree the actual destination, waiting arrangements and return pickup. Avoid assuming that a ride to the lake includes a driver remaining nearby. If the day continues to Dilijan, discuss the extra travel and whether an overnight stay suits your pace.",
        ),
        section(
          "Check activities with the actual provider",
          "A restaurant reservation, beach facility or water activity must be confirmed with its operator. Ask about current opening, access and any requirements before committing to the journey. ARMMATE can help with communication and finding an appropriate local service; it does not operate the lake's facilities or provide rescue services.",
          "Keep admission, meals, equipment, activity providers and transport outside the assistant's fee. The availability and conditions of these services belong to their providers and can change.",
        ),
        section(
          "Make your request useful",
          "Tell ARMMATE your date, accommodation base, group size, desired shore experience and any mobility needs. Your personal assistant can help narrow the choices, find transport and discuss reservations. A companion for selected hours can be requested separately, subject to availability; it is not automatically included in online support.",
        ),
      ],
      faq: [
        [
          "Can I visit Lake Sevan without a tour?",
          "Yes. Choose a particular stop and arrange how to get there and back. A local assistant can help with practical planning without imposing a group itinerary.",
        ],
        [
          "Does a Sevanavank visit mean a beach visit too?",
          "No. The monastery viewpoint and time by the water have different access and timing needs. Decide which experience you want and plan each stop separately.",
        ],
        [
          "Can I combine Sevan and Dilijan?",
          "You can discuss a combined route, but the added journey, stops and return need their own time. Your assistant can help compare it with separate days or an overnight stay.",
        ],
      ],
      sources: [sevanSource, planningSource],
    },
    ru: {
      title: "Озеро Севан самостоятельно: берег, сезон и дорога | арммейт",
      description:
        "Выбери остановку на Севане по своим интересам и сезону. Продумай доступ, питание и обратный транспорт с практической поддержкой местного ассистента.",
      h1: "Спланируй поездку на Севан под свои интересы",
      lead: "Вид от монастыря, обед у озера и отдых у воды — разные варианты дня. Севан большой, поэтому перед заказом машины выбери конкретный берег или остановку.",
      sections: [
        section(
          "Определи конкретную точку у озера",
          "Сначала реши, что важнее: пейзаж, культурное место, еда или время у воды. Севанаванк известен видами над озером, но его посещение не заменяет выбор пляжа. Если важно меньше подниматься, заранее спроси о ступенях и доступе.",
          "Посмотри предлагаемую остановку на карте. Общего названия «Севан» недостаточно: разные участки берега меняют дорогу, удобства и время на месте. Короткий список приоритетов полезнее попытки объехать всё озеро за один день.",
        ),
        section(
          "Учти сезон и возвращение",
          "Погода, условия у воды и работа сезонных заведений влияют на программу. Летнее описание ещё не означает, что место или занятие доступны в твои даты. Подготовь тёплый слой одежды и альтернативу на случай неподходящих условий.",
          "При заказе транспорта согласуй конкретное место, ожидание и обратную встречу. Поездка к озеру не означает автоматически, что водитель останется рядом. Если хочешь продолжить в Дилижан, обсуди дополнительную дорогу и возможную ночёвку.",
        ),
        section(
          "Уточни условия у поставщика услуги",
          "Стол в ресторане, пляжная площадка и водное занятие подтверждаются их оператором. Перед поездкой уточни часы, доступ и требования. арммейт помогает общаться и искать подходящие услуги, но не управляет объектами у озера и не предоставляет спасательную помощь.",
          "Билеты, питание, оборудование, занятия и транспорт не входят автоматически в оплату ассистента. Доступность и условия зависят от поставщиков и могут меняться.",
        ),
        section(
          "Что сообщить ассистенту",
          "Напиши дату, место проживания, число гостей, желаемый формат отдыха и потребности при передвижении. Ассистент поможет сузить выбор, найти транспорт и обсудить бронирования. Личного сопровождающего на отдельные часы можно запросить дополнительно, с учётом доступности.",
        ),
      ],
      faq: [
        [
          "Можно посетить Севан без тура?",
          "Да. Выбери конкретную остановку и продумай дорогу туда и обратно. Местный ассистент поможет с организационными вопросами без обязательной групповой программы.",
        ],
        [
          "Посещение Севанаванка включает пляж?",
          "Нет. Монастырская площадка и отдых у воды требуют отдельного планирования доступа и времени.",
        ],
        [
          "Можно совместить Севан с Дилижаном?",
          "Можно обсудить такой маршрут. Дополнительная дорога, остановки и возвращение требуют времени; стоит сравнить его с отдельными днями или ночёвкой.",
        ],
      ],
      sources: [sevanSource, planningSource],
    },
    hy: {
      title: "Սևան՝ ինքնուրույն այց, ափի ընտրություն և ճանապարհ | արմմեյթ",
      description:
        "Ընտրիր Սևանի կանգառը՝ ըստ հետաքրքրությունների, քայլելու նախասիրության ու սեզոնի։ Պլանավորիր վերադարձը և տեղական պայմանները՝ ասիստենտի գործնական օգնությամբ։",
      h1: "Սևանի այցը պլանավորիր քո ուզած զբաղմունքի շուրջ",
      lead: "Վանքից բացվող տեսարանը, ափամերձ ճաշն ու ջրի մոտ հանգիստը օրվա տարբեր ծրագրեր են։ Սևանը մեծ է․ մեքենա կազմակերպելուց առաջ ընտրիր կոնկրետ ափը կամ կանգառը։",
      sections: [
        section(
          "Նախ ընտրիր կոնկրետ վայր",
          "Որոշիր՝ օրվա նպատակը բնապատկերն է, մշակութային այցը, սնունդը, թե ջրի մոտ ժամանակ անցկացնելը։ Սևանավանքը հայտնի դիտակետ է, բայց այնտեղ գնալը նույնը չէ, ինչ լողափ ընտրելը։ Եթե պետք է քիչ բարձրանալ, նախապես հարցրու աստիճանների ու մուտքի մասին։",
          "Առաջարկվող կանգառը գտիր քարտեզի վրա։ Միայն «Սևան» անվանումը բավարար չէ․ տարբեր ափերը փոխում են ճանապարհը, հարմարություններն ու տեղում մնալու ժամանակը։ Մի քանի առաջնահերթություն ընտրելը ավելի օգտակար է, քան ամբողջ լիճը մեկ օրում տեսնելու ծրագիրը։",
        ),
        section(
          "Հաշվի առ սեզոնն ու վերադարձը",
          "Եղանակը, ափի պայմաններն ու սեզոնային վայրերի աշխատանքն ազդում են ծրագրի վրա։ Ամառային նկարագրությունը չի հաստատում, որ զբաղմունքը կամ վայրը գործում է քո օրերին։ Պատրաստիր տաք հագուստի շերտ և այլընտրանք՝ անհարմար եղանակի դեպքում։",
          "Տրանսպորտի համար համաձայնեցրու կոնկրետ վայրը, սպասելն ու վերադարձի հանդիպումը։ Լիճ հասնելը չի նշանակում, որ վարորդը կմնա մոտակայքում։ Եթե շարունակելու ես Դիլիջան, քննարկիր լրացուցիչ ճանապարհն ու հնարավոր գիշերակացը։",
        ),
        section(
          "Պայմանները ճշտիր ծառայություն մատուցողի հետ",
          "Ռեստորանի սեղանը, լողափի տարածքն ու ջրային զբաղմունքը հաստատում է համապատասխան կազմակերպիչը։ Նախ ճշտիր ժամերը, հասանելիությունն ու պահանջները։ արմմեյթն օգնում է հաղորդակցվել և ծառայություն գտնել, բայց չի կառավարում լճի տարածքներն ու չի տրամադրում փրկարարական օգնություն։",
          "Տոմսերը, սնունդը, սարքավորումները, զբաղմունքներն ու տրանսպորտն ինքնաբերաբար ներառված չեն ասիստենտի վճարում։ Հասանելիությունն ու պայմանները կախված են մատուցողներից և կարող են փոխվել։",
        ),
        section(
          "Ինչ փոխանցել ասիստենտին",
          "Նշիր օրը, գիշերակացի վայրը, մարդկանց քանակը, ուզած ափամերձ զբաղմունքն ու տեղաշարժի կարիքները։ Ասիստենտը կօգնի ընտրությունը նեղացնել, տրանսպորտ գտնել և ամրագրում քննարկել։ Ընտրված ժամերի անձնական ուղեկիցը կարող ես խնդրել լրացուցիչ՝ ըստ հասանելիության։",
        ),
      ],
      faq: [
        [
          "Կարո՞ղ եմ Սևան այցելել առանց տուրի։",
          "Այո։ Ընտրիր կոնկրետ կանգառը և կազմակերպիր գնալու ու վերադառնալու ճանապարհը։ Տեղական ասիստենտը կօգնի գործնական հարցերում՝ առանց պարտադիր խմբային ծրագրի։",
        ],
        [
          "Սևանավանքի այցը ներառո՞ւմ է լողափը։",
          "Ոչ։ Վանքի դիտակետն ու ջրի մոտ ժամանակ անցկացնելը հասանելիության ու ժամանակի առանձին պլանավորում են պահանջում։",
        ],
        [
          "Կարո՞ղ եմ համատեղել Սևանն ու Դիլիջանը։",
          "Կարող ենք քննարկել համատեղ երթուղին։ Լրացուցիչ ճանապարհը, կանգառներն ու վերադարձը ժամանակ են պահանջում․ համեմատիր նաև առանձին օրերն ու գիշերակացը։",
        ],
      ],
      sources: [sevanSource, planningSource],
    },
  },
  dilijan: {
    en: {
      title:
        "Dilijan Independently: Town Walks, Forest Plans & Local Help | ARMMATE",
      description:
        "Plan a Dilijan visit that separates town walks from forest outings. Check route access, transport and your return, with practical local help from ARMMATE.",
      h1: "Dilijan: choose a town day, a forest outing or a longer stay",
      lead: "A café and old-town walk need a different plan from a forest trail or a visit beyond the town. Decide which kind of day you want before adding Dilijan to a route through Armenia.",
      sections: [
        section(
          "Distinguish the town from the wider landscape",
          "Dilijan is known for its wooded surroundings, but a town visit does not automatically include a suitable hiking route. A short walk around the older streets, a craft stop and a meal can form a relaxed day. Check where each proposed stop actually is, particularly if accommodation is outside the centre.",
          "Share your walking preferences when asking for recommendations. A place that looks close on a map can still involve slopes, a vehicle journey or access that does not suit everyone in the group.",
        ),
        section(
          "Make a separate plan for time in the forest",
          "For a trail, ask about current route conditions, weather, daylight, difficulty and navigation. Walking around town is not preparation for every forest outing. Decide whether you need an appropriately experienced local guide and confirm that service separately.",
          "ARMMATE can help find local information or an appropriate provider. Online assistance and personal companionship are not mountain guiding, rescue services or a guarantee of mobile coverage. Choose an outing that fits your actual experience and available time.",
        ),
        section(
          "Allow time beyond the road journey",
          "A stop at Lake Sevan on the way changes the time left in Dilijan. Compare a short combined visit with a separate day or overnight stay instead of assuming everything will fit. If a plan includes an outlying monastery or lake, check the additional access and return journey.",
          "Agree the pickup point, waiting time and final destination with a driver. Check the current operation of restaurants and other venues for your dates. Accommodation, transport, admission and specialist activities have separate costs.",
        ),
        section(
          "Ask for assistance around a clear plan",
          "Tell your assistant whether the priority is food, architecture, crafts, a gentle walk or a forest experience. Include dates, base and mobility requirements. ARMMATE can help compare practical options and communicate with local services; in-person accompaniment is available only by separate agreement and subject to availability.",
        ),
      ],
      faq: [
        [
          "Do I have to hike to enjoy Dilijan?",
          "No. A town walk, cafés and cultural stops can be planned without a forest hike. Make the walking level clear when discussing the day.",
        ],
        [
          "Does a personal companion count as a mountain guide?",
          "No. Specialist guiding is a separate service to discuss with a suitable provider. ARMMATE's online assistance is not a rescue or navigation service.",
        ],
        [
          "Can I ask for help arranging an overnight stay?",
          "Your assistant can help find accommodation options and communicate with local services. Room availability and accommodation costs are separate from the assistance agreement.",
        ],
      ],
      sources: [dilijanSource, planningSource],
    },
    ru: {
      title: "Дилижан самостоятельно: город, лес и план поездки | арммейт",
      description:
        "Раздели прогулку по Дилижану и лесной маршрут: продумай доступ, дорогу, условия и возвращение. Местная практическая поддержка от арммейта.",
      h1: "Дилижан: городская прогулка, лес или поездка с ночёвкой",
      lead: "Кафе и старые улочки требуют другого плана, чем лесная тропа или место за городом. Определи желаемый формат перед тем, как включать Дилижан в маршрут.",
      sections: [
        section(
          "Раздели город и его окрестности",
          "Дилижан известен лесными пейзажами, но городской визит не включает автоматически подходящий пеший маршрут. Старые улицы, ремесленная остановка и обед могут составить спокойный день. Уточняй положение каждого места, особенно если жильё находится вне центра.",
          "При запросе рекомендаций расскажи о предпочтениях по ходьбе. Близкая точка на карте иногда требует подъёма, машины или доступа, который удобен не всем участникам.",
        ),
        section(
          "Лесной выход планируй отдельно",
          "Для тропы уточни состояние маршрута, погоду, светлое время, сложность и навигацию. Городская прогулка не равна подготовке к любому лесному выходу. Реши, нужен ли опытный профильный проводник, и согласуй его отдельно.",
          "арммейт поможет найти сведения или подходящего поставщика услуги. Онлайн-поддержка и обычный сопровождающий не заменяют горного гида, спасателей и не гарантируют мобильную связь. Выбирай маршрут по своему опыту и запасу времени.",
        ),
        section(
          "Оставь время после дороги",
          "Остановка на Севане по пути уменьшает время в Дилижане. Сравни короткий совместный выезд с отдельным днём или ночёвкой. Если план включает монастырь или озеро вне города, уточни дополнительную дорогу и возвращение.",
          "С водителем согласуй встречу, ожидание и конечную точку. Актуальную работу кафе и других мест проверь на свои даты. Жильё, транспорт, билеты и специальные занятия оплачиваются отдельно.",
        ),
        section(
          "Поставь понятную задачу ассистенту",
          "Укажи, что важнее: еда, архитектура, ремёсла, спокойная прогулка или лес. Добавь даты, место проживания и потребности при передвижении. Ассистент поможет сравнить варианты и общаться с местными службами. Личное сопровождение обсуждается отдельно, по доступности.",
        ),
      ],
      faq: [
        [
          "Чтобы увидеть Дилижан, обязательно идти в поход?",
          "Нет. Можно выбрать городскую прогулку, кафе и культурные остановки без лесного похода. Сообщи желаемую пешую нагрузку.",
        ],
        [
          "Личный сопровождающий является горным гидом?",
          "Нет. Профильное сопровождение маршрута нужно отдельно обсудить с подходящим специалистом. Онлайн-поддержка не является спасательной или навигационной службой.",
        ],
        [
          "Можно помочь с ночёвкой?",
          "Ассистент поможет найти варианты жилья и связаться с местными службами. Доступность номеров и стоимость проживания согласуются отдельно.",
        ],
      ],
      sources: [dilijanSource, planningSource],
    },
    hy: {
      title: "Դիլիջան՝ քաղաքային զբոսանք և անտառային ծրագրեր | արմմեյթ",
      description:
        "Դիլիջանի քաղաքային զբոսանքը տարբերիր անտառային երթուղուց։ Ճշտիր հասանելիությունը, ճանապարհն ու վերադարձը՝ տեղական ասիստենտի գործնական աջակցությամբ։",
      h1: "Դիլիջան․ քաղաքային օր, անտառային այց կամ գիշերակաց",
      lead: "Սրճարանն ու հին փողոցների զբոսանքը այլ ծրագիր են, քան անտառային արահետը կամ քաղաքից դուրս վայրը։ Նախ որոշիր օրվա ձևաչափը, հետո ներառիր Դիլիջանը երթուղուդ մեջ։",
      sections: [
        section(
          "Տարբերիր քաղաքն ու շրջակայքը",
          "Դիլիջանը հայտնի է անտառապատ բնապատկերներով, բայց քաղաք այցելելն ինքնաբերաբար հարմար արշավ չի ներառում։ Հին փողոցները, արհեստի կանգառն ու ճաշը կարող են հանգիստ օր կազմել։ Ճշտիր յուրաքանչյուր վայրի դիրքը, հատկապես եթե կացությունը կենտրոնից դուրս է։",
          "Խորհուրդ խնդրելիս նշիր քայլելու նախասիրություններդ։ Քարտեզի վրա մոտ կետը երբեմն պահանջում է վերելք, մեքենա կամ այնպիսի հասանելիություն, որը խմբի բոլոր անդամներին հարմար չէ։",
        ),
        section(
          "Անտառային այցն առանձին պլանավորիր",
          "Արահետի համար ճշտիր ընթացիկ վիճակը, եղանակը, ցերեկային ժամանակը, դժվարությունն ու կողմնորոշումը։ Քաղաքում քայլելը չի նշանակում ցանկացած անտառային ելքի պատրաստ լինել։ Որոշիր՝ արդյոք փորձառու մասնագետ ուղեկցորդ է պետք, և նրա ծառայությունը համաձայնեցրու առանձին։",
          "արմմեյթը կարող է օգնել տեղեկություն կամ համապատասխան մասնագետ գտնել։ Առցանց աջակցությունն ու սովորական ընկերակցությունը լեռնային գիդի կամ փրկարարական ծառայություն չեն և չեն երաշխավորում բջջային կապ։ Ընտրիր քո փորձին ու ժամանակին համապատասխան երթուղի։",
        ),
        section(
          "Ժամանակ թող ճանապարհից հետո",
          "Ճանապարհին Սևանի կանգառը նվազեցնում է Դիլիջանում մնալու ժամանակը։ Համեմատիր կարճ համատեղ այցը առանձին օրվա կամ գիշերակացի հետ։ Քաղաքից դուրս վանք կամ լիճ ավելացնելիս հաշվի առ լրացուցիչ ճանապարհն ու վերադարձը։",
          "Վարորդի հետ համաձայնեցրու հանդիպումը, սպասելն ու վերջին կետը։ Սրճարանների և այլ վայրերի աշխատանքը ճշտիր քո օրերի համար։ Կացությունը, տրանսպորտը, տոմսերն ու հատուկ զբաղմունքներն ունեն առանձին արժեք։",
        ),
        section(
          "Ասիստենտին փոխանցիր հստակ նպատակ",
          "Ասա՝ առաջնայինը սնունդն է, ճարտարապետությունը, արհեստները, հանգիստ զբոսանքը, թե անտառը։ Նշիր օրերդ, գիշերակացի վայրն ու տեղաշարժի կարիքները։ Ասիստենտը կօգնի համեմատել տարբերակներն ու հաղորդակցվել տեղական ծառայությունների հետ։ Անձնական ուղեկցումը քննարկվում է առանձին՝ ըստ հասանելիության։",
        ),
      ],
      faq: [
        [
          "Դիլիջանը տեսնելու համար պարտադի՞ր է արշավել։",
          "Ոչ։ Կարող ես ընտրել քաղաքային զբոսանք, սրճարաններ ու մշակութային կանգառներ՝ առանց անտառային արշավի։ Նշիր քայլելու նախընտրած ծավալը։",
        ],
        [
          "Անձնական ուղեկիցը լեռնային գի՞դ է։",
          "Ոչ։ Մասնագիտական երթուղու ուղեկցումը պետք է առանձին քննարկել համապատասխան մասնագետի հետ։ Առցանց աջակցությունը փրկարարական կամ նավիգացիոն ծառայություն չէ։",
        ],
        [
          "Կարո՞ղ եք օգնել գիշերակաց գտնել։",
          "Ասիստենտը կարող է առաջարկներ գտնել և հաղորդակցվել տեղական ծառայությունների հետ։ Սենյակի հասանելիությունն ու կացության գինը համաձայնեցվում են առանձին։",
        ],
      ],
      sources: [dilijanSource, planningSource],
    },
  },
  gyumri: {
    en: {
      title:
        "Gyumri Independently: Architecture, Crafts & Travel Planning | ARMMATE",
      description:
        "Build an independent Gyumri visit around historic streets, crafts and food. Plan transport, museum timing and local communication with practical assistance.",
      h1: "Gyumri at your own pace: streets, crafts and local culture",
      lead: "Give Gyumri time beyond the journey there. A city walk, a craft or museum stop and a meal can offer more than a quick photo visit followed immediately by the road back.",
      sections: [
        section(
          "Build a walk around the historic centre",
          "Gyumri's historic streets, stone architecture and cultural character reward a slower visit. Choose a manageable cluster of stops near the centre, with time to notice buildings and pause. Old streets and individual entrances can have uneven surfaces or steps, so explain any access needs before fixing the route.",
          "Ask for a clear meeting point if you have a companion. You may prefer a gentle neighbourhood walk to a long list of attractions. A personal assistant can help discuss the options, while specialist historical interpretation can be arranged separately.",
        ),
        section(
          "Make room for crafts, museums and food",
          "Pick one or two cultural interests rather than assuming every workshop or museum will be available whenever you arrive. Confirm current hours, access and any advance arrangement with the venue. Tell your assistant whether you want to see crafts, visit an exhibition or simply discover everyday city life.",
          "A meal can be part of the plan, not just a gap between sights. Discuss dietary needs and the number of people before requesting a reservation. Restaurant and activity payments remain separate from the assistance fee.",
        ),
        section(
          "Compare a day visit with an overnight stay",
          "A return trip from Yerevan leaves less time in the city than an overnight stay. Compare both options with your arrival and departure plans. If using public transport, check the current timetable and where you will arrive; do not rely on a remembered schedule. For a private driver, agree waiting, stops and return arrangements.",
          "Weather and daylight may affect how much walking suits the day. Leave a margin for the journey instead of booking the last cultural stop against a tight return. Accommodation and transport availability must be confirmed separately.",
        ),
        section(
          "Get practical help without a fixed itinerary",
          "Send ARMMATE your date, base, interests and the level of accompaniment you want. Online travel support can help with planning, finding transport, reservations and communication in Gyumri. In-person companionship outside Yerevan is discussed individually, including travel time and availability; it is not automatically included in online assistance.",
        ),
      ],
      faq: [
        [
          "Can ARMMATE help with a trip to Gyumri?",
          "Yes. You can discuss recommendations, transport arrangements and local communication. The tasks, service period and individual fee are agreed before confirmation.",
        ],
        [
          "Can I request a companion in Gyumri?",
          "You can request one. Availability, travel arrangements, in-person hours and cost must be agreed separately; a companion is not included automatically.",
        ],
        [
          "Should I stay overnight?",
          "That depends on your interests and available time. Compare the journey with the stops you want, rather than assuming a day trip and an overnight visit give the same time in the city.",
        ],
      ],
      sources: [gyumriSource],
    },
    ru: {
      title: "Гюмри самостоятельно: архитектура, ремёсла и дорога | арммейт",
      description:
        "Спланируй Гюмри вокруг старых улиц, ремёсел и еды. Уточни транспорт, часы музеев и местные договорённости с практической поддержкой арммейта.",
      h1: "Гюмри в своём темпе: улицы, ремёсла и городская культура",
      lead: "Оставь Гюмри время помимо дороги. Прогулка, музей или ремесленная остановка и обед дают больше впечатлений, чем короткий фотостоп перед немедленным возвращением.",
      sections: [
        section(
          "Начни с исторического центра",
          "Старые улицы, каменная архитектура и культурный характер Гюмри подходят для неспешного знакомства. Собери небольшой маршрут рядом с центром и оставь время рассмотреть здания. На старых улицах и у входов бывают неровные покрытия и ступени: важные потребности при передвижении лучше сообщить заранее.",
          "Для встречи с сопровождающим выбери понятную точку. Спокойная прогулка по кварталу может подойти лучше длинного перечня памятников. Ассистент поможет обсудить варианты; историческую экскурсию специалиста можно организовать отдельно.",
        ),
        section(
          "Выбери ремёсла, музей и место для обеда",
          "Остановись на одном-двух культурных интересах, не предполагая, что любая мастерская или музей доступны в любое время. Проверь часы и необходимость предварительной договорённости. Объясни, хочешь ли ты увидеть ремёсла, выставку или обычную городскую жизнь.",
          "Обед может стать полноценной частью визита. Перед запросом бронирования укажи число гостей и пищевые потребности. Ресторан и занятия оплачиваются отдельно от помощи ассистента.",
        ),
        section(
          "Сравни один день с ночёвкой",
          "При поездке из Еревана и обратно на город остаётся меньше времени, чем с ночёвкой. Сравни оба варианта с дальнейшими планами. Для общественного транспорта проверь актуальное расписание и точку прибытия; для частного водителя — ожидание, остановки и возвращение.",
          "Погода и светлое время влияют на удобство прогулок. Оставь дорожный запас и не ставь последнюю остановку вплотную к отъезду. Жильё и транспорт нужно подтвердить отдельно.",
        ),
        section(
          "Получи помощь без готового маршрута",
          "Пришли арммейту дату, место проживания, интересы и желаемое сопровождение. Онлайн-поддержка поможет с планом, поиском дороги, бронированиями и общением. Личная компания за пределами Еревана обсуждается индивидуально, включая дорогу и доступность.",
        ),
      ],
      faq: [
        [
          "арммейт может помочь с поездкой в Гюмри?",
          "Да. Можно обсудить рекомендации, организацию транспорта и местное общение. Задачи, период услуги и индивидуальная стоимость согласуются заранее.",
        ],
        [
          "Можно запросить сопровождающего в Гюмри?",
          "Да. Доступность, дорога, часы и стоимость нужно согласовать отдельно. Сопровождение не включено автоматически.",
        ],
        [
          "Нужна ли ночёвка?",
          "Это зависит от интересов и времени. Сравни дорогу с желаемыми остановками: дневной выезд и ночёвка оставляют разное время для города.",
        ],
      ],
      sources: [gyumriSource],
    },
    hy: {
      title: "Գյումրի՝ ինքնուրույն այց, փողոցներ և արհեստներ | արմմեյթ",
      description:
        "Պլանավորիր Գյումրիի այցը հին փողոցների, արհեստների ու սննդի շուրջ։ Ճշտիր տրանսպորտը, թանգարանների ժամերն ու տեղական կազմակերպչական հարցերը։",
      h1: "Գյումրին քո տեմպով․ փողոցներ, արհեստներ և տեղական մշակույթ",
      lead: "Գյումրիին ժամանակ տուր նաև ճանապարհից հետո։ Զբոսանքը, թանգարանը կամ արհեստի կանգառն ու ճաշը կարող են ավելին տալ, քան լուսանկարվելու կարճ այցն ու անմիջական վերադարձը։",
      sections: [
        section(
          "Սկսիր պատմական կենտրոնից",
          "Գյումրիի հին փողոցները, քարե ճարտարապետությունն ու մշակութային բնավորությունը հարմար են դանդաղ բացահայտելու համար։ Կենտրոնի շուրջ ընտրիր փոքր երթուղի և ժամանակ թող շենքերը դիտելու ու կանգ առնելու համար։ Հին փողոցներում և մուտքերի մոտ կարող են լինել անհարթություններ ու աստիճաններ․ նախապես նշիր տեղաշարժի կարիքները։",
          "Ուղեկցի հետ հանդիպելու համար ընտրիր հասկանալի կետ։ Հանգիստ թաղամասային զբոսանքը երբեմն ավելի հարմար է, քան հուշարձանների երկար ցուցակը։ Ասիստենտը կօգնի քննարկել տարբերակները, իսկ մասնագետի պատմական ներկայացումը կարող ես կազմակերպել առանձին։",
        ),
        section(
          "Տեղ թող արհեստին, թանգարանին ու ճաշին",
          "Ընտրիր մեկ-երկու մշակութային հետաքրքրություն՝ չհամարելով, որ ցանկացած արվեստանոց կամ թանգարան բաց է ցանկացած ժամի։ Ճշտիր աշխատանքը, մուտքն ու նախնական պայմանավորվածության կարիքը։ Ասա՝ ուզում ես արհեստ տեսնել, ցուցադրություն այցելել, թե սովորական քաղաքային կյանք բացահայտել։",
          "Ճաշը կարող է այցի լիարժեք մաս լինել։ Ամրագրման հարցումից առաջ նշիր մարդկանց քանակն ու սննդի պահանջները։ Սնունդն ու զբաղմունքները վճարվում են ասիստենտի ծառայությունից առանձին։",
        ),
        section(
          "Համեմատիր մեկ օրը գիշերակացի հետ",
          "Երևանից գնալու և վերադառնալու դեպքում քաղաքում ավելի քիչ ժամանակ կմնա, քան տեղում գիշերելով։ Երկու տարբերակն էլ համեմատիր հետագա ծրագրիդ հետ։ Հանրային տրանսպորտի համար ճշտիր ընթացիկ չվացուցակն ու ժամանման կետը, իսկ վարորդի հետ՝ սպասելը, կանգառներն ու վերադարձը։",
          "Եղանակն ու ցերեկային ժամերը կարող են փոխել քայլելու հարմարությունը։ Ճանապարհի համար պահուստային ժամանակ թող և վերջին կանգառը մի դիր մեկնելու ժամին շատ մոտ։ Կացությունն ու փոխադրումը հաստատվում են առանձին։",
        ),
        section(
          "Աջակցություն՝ առանց պատրաստի երթուղու",
          "արմմեյթին ուղարկիր օրը, գիշերակացի վայրը, հետաքրքրություններն ու ցանկալի ուղեկցումը։ Առցանց աջակցությունը կօգնի ծրագրի, տրանսպորտի որոնման, ամրագրումների և հաղորդակցման հարցերում։ Երևանից դուրս անձնական ուղեկցումը քննարկվում է անհատապես՝ ներառյալ ճանապարհն ու հասանելիությունը։",
        ),
      ],
      faq: [
        [
          "արմմեյթը կարո՞ղ է օգնել Գյումրիի այցի հարցում։",
          "Այո։ Կարող ես քննարկել խորհուրդները, տրանսպորտի կազմակերպումն ու տեղական հաղորդակցումը։ Գործերը, ժամկետն ու անհատական արժեքը համաձայնեցվում են նախապես։",
        ],
        [
          "Կարո՞ղ եմ ուղեկից խնդրել Գյումրիում։",
          "Այո։ Հասանելիությունը, ճանապարհը, ժամերն ու գինը պետք է համաձայնեցնել առանձին։ Ուղեկցումը ինքնաբերաբար ներառված չէ։",
        ],
        [
          "Պե՞տք է գիշերեմ տեղում։",
          "Դա կախված է հետաքրքրություններից ու ժամանակից։ Ճանապարհը համեմատիր ցանկալի կանգառների հետ․ մեկօրյա այցն ու գիշերակացը քաղաքին տարբեր ժամանակ են թողնում։",
        ],
      ],
      sources: [gyumriSource],
    },
  },
  khorvirap: {
    en: {
      title:
        "Khor Virap Independently: Monastery Visit & Practical Planning | ARMMATE",
      description:
        "Prepare a Khor Virap visit with time for the monastery, realistic expectations for Mount Ararat views and a return journey. Get practical local assistance.",
      h1: "Khor Virap: plan the monastery visit beyond the photograph",
      lead: "The familiar view of the monastery with Mount Ararat behind it is only one part of a visit. Plan for the site itself, the weather and the journey, with room to enjoy the place at your own pace.",
      sections: [
        section(
          "Separate the monastery visit from the mountain view",
          "Khor Virap is a religious and historical site in Armenia, known for its setting facing Mount Ararat. The mountain view depends on visibility and weather. A photograph taken on a clear day cannot promise the same conditions during your visit, so decide whether the monastery itself is part of your interest.",
          "If detailed historical or religious interpretation matters to you, ask about a specialist guide. A local assistant can help organise transport and practical communication; personal companionship does not automatically include professional guiding.",
        ),
        section(
          "Plan access and time at the site",
          "Discuss steps, surfaces and any confined spaces you are considering before deciding how to explore. Different parts of a visit may involve different levels of access. You can choose a gentler visit rather than treating every possible activity as compulsory.",
          "Follow local guidance about clothing, photography and services at a working monastery. Check the current arrangements for your date. Bring appropriate clothing and allow time to pause without making the return journey depend on a very tight schedule.",
        ),
        section(
          "Agree a return, not just a drop-off",
          "Tell a driver the actual destination, waiting arrangement and pickup point for the return. If you add a meal, another monastery or a longer regional route, discuss the extra travel explicitly. It may make more sense as a separate day rather than an improvised extension.",
          "The monastery visit is not a border crossing or access to Mount Ararat itself. Treat any further travel as a separate plan with its own requirements. ARMMATE does not promise a particular view, unrestricted access or the availability of third-party services.",
        ),
        section(
          "Use local support for practical decisions",
          "Share your preferred day, base, interests and mobility needs with ARMMATE. Your assistant can help compare transport options, discuss stops and communicate with local providers. Ask separately for in-person accompaniment if desired. Transport, meals, admission and any specialist guide have their own costs, separate from the agreed assistance fee.",
        ),
      ],
      faq: [
        [
          "Will I definitely see Mount Ararat clearly?",
          "No. Visibility depends on weather and conditions. Plan the visit around your interest in the monastery as well as the possible view.",
        ],
        [
          "Does visiting Khor Virap include visiting Mount Ararat?",
          "No. The monastery is in Armenia; viewing the mountain from there is not a visit to the mountain or a border crossing.",
        ],
        [
          "Can I arrange practical help without booking a full tour?",
          "Yes. You can discuss transport planning, communication and optional accompaniment. The scope, availability and individual pricing are agreed before confirmation.",
        ],
      ],
      sources: [monasterySource],
    },
    ru: {
      title: "Хор Вирап самостоятельно: монастырь, вид и дорога | арммейт",
      description:
        "Подготовь визит в Хор Вирап: время на монастырь, реалистичные ожидания вида на Арарат и обратная дорога. Практическая местная помощь от арммейта.",
      h1: "Хор Вирап: спланируй визит помимо фотографии",
      lead: "Знакомый вид монастыря на фоне Арарата — лишь часть посещения. Учти сам памятник, погоду и дорогу, оставив время увидеть место в собственном темпе.",
      sections: [
        section(
          "Раздели монастырь и ожидание вида",
          "Хор Вирап — религиозный и исторический памятник в Армении, известный расположением с видом на Арарат. Видимость зависит от погоды и условий. Снимок ясного дня не обещает такую же картину в день твоей поездки, поэтому учитывай интерес к самому монастырю.",
          "Если важен подробный исторический или религиозный рассказ, запроси отдельного гида. Местный ассистент помогает с дорогой и общением, а личная компания не включает автоматически профессиональную экскурсию.",
        ),
        section(
          "Обсуди доступ и время на месте",
          "Перед выбором программы обсуди ступени, покрытие и тесные пространства, которые собираешься посещать. Разные части визита требуют разной доступности. Можно выбрать спокойный вариант, не считая каждое возможное занятие обязательным.",
          "В действующем монастыре следуй местным указаниям об одежде, съёмке и службах. Уточни условия на свою дату. Подготовь подходящую одежду и запас времени, чтобы возвращение не зависело от слишком плотного графика.",
        ),
        section(
          "Согласуй возвращение, а не только высадку",
          "Сообщи водителю конечную точку, ожидание и место обратной встречи. Обед, другой монастырь или продолжение регионального маршрута добавляют дорогу, которую нужно обсудить отдельно. Иногда удобнее выделить для этого другой день.",
          "Посещение монастыря не является пересечением границы или поездкой на сам Арарат. Любое дальнейшее путешествие требует отдельного плана. арммейт не обещает определённый вид, неограниченный доступ или наличие сторонних услуг.",
        ),
        section(
          "Практические задачи для ассистента",
          "Напиши день, место проживания, интересы и особенности передвижения. Ассистент поможет сравнить транспорт, обсудить остановки и связаться с местными поставщиками. Личное сопровождение запрашивается отдельно. Дорога, питание, билеты и специалист-гид имеют собственную стоимость.",
        ),
      ],
      faq: [
        [
          "Я точно увижу Арарат ясно?",
          "Нет. Видимость зависит от погоды и условий. Планируй визит с учётом интереса к монастырю, а не только к возможному виду.",
        ],
        [
          "Посещение Хор Вирапа включает поездку на Арарат?",
          "Нет. Монастырь находится в Армении; вид на гору не является её посещением или пересечением границы.",
        ],
        [
          "Можно получить помощь без полного тура?",
          "Да. Можно обсудить дорогу, общение и дополнительное сопровождение. Объём, доступность и индивидуальная стоимость согласуются заранее.",
        ],
      ],
      sources: [monasterySource],
    },
    hy: {
      title: "Խոր Վիրապ՝ ինքնուրույն այց և գործնական պլանավորում | արմմեյթ",
      description:
        "Պատրաստիր Խոր Վիրապի այցը՝ վանքի համար ժամանակ, Արարատի տեսարանի իրատեսական ակնկալիքներ և վերադարձի ճանապարհ։ Ստացիր տեղական գործնական աջակցություն։",
      h1: "Խոր Վիրապ․ պլանավորիր այցը նաև լուսանկարից դուրս",
      lead: "Վանքի ու Արարատի հայտնի տեսարանը այցի միայն մի մասն է։ Հաշվի առ վանքն ինքնին, եղանակն ու ճանապարհը՝ ժամանակ թողնելով քո տեմպով բացահայտելու համար։",
      sections: [
        section(
          "Տարբերիր վանքի այցն ու լեռան տեսարանը",
          "Խոր Վիրապը Հայաստանի կրոնական ու պատմական վայրերից է՝ հայտնի Արարատին նայող դիրքով։ Լեռան տեսանելիությունը կախված է եղանակից ու պայմաններից։ Պարզ օրն արված նկարը չի խոստանում նույն տեսարանը քո այցի պահին․ հաշվի առ նաև հենց վանքի հանդեպ հետաքրքրությունդ։",
          "Եթե կարևոր է պատմական կամ կրոնական մանրամասն ներկայացումը, քննարկիր մասնագետ գիդի կարիքը։ Ասիստենտը կարող է օգնել տրանսպորտի ու հաղորդակցման հարցերում, իսկ ընկերակցությունն ինքնաբերաբար մասնագիտական էքսկուրսիա չի ներառում։",
        ),
        section(
          "Քննարկիր հասանելիությունն ու ժամանակը",
          "Մինչև ծրագիր որոշելը քննարկիր աստիճանները, մակերեսներն ու հնարավոր նեղ տարածքները, որոնք ցանկանում ես այցելել։ Այցի տարբեր մասերն ունեն տարբեր հասանելիություն։ Կարող ես ընտրել հանգիստ տարբերակ՝ առանց ամեն զբաղմունք պարտադիր համարելու։",
          "Գործող վանքում հետևիր հագուստի, նկարելու և արարողությունների տեղական ցուցումներին։ Ճշտիր քո օրվա պայմանները, պատրաստիր համապատասխան հագուստ և ժամանակ թող հանգիստ կանգ առնելու համար։",
        ),
        section(
          "Համաձայնեցրու վերադարձը, ոչ միայն հասնելը",
          "Վարորդին նշիր կոնկրետ վայրը, սպասելն ու հետդարձի հանդիպման կետը։ Ճաշը, այլ վանքը կամ ավելի երկար շրջանային երթուղին ավելացնում են ճանապարհ, որը պետք է քննարկել առանձին։ Երբեմն դրա համար մեկ այլ օրն ավելի հարմար է։",
          "Վանքի այցը սահմանահատում կամ հենց Արարատ բարձրանալու հնարավորություն չէ։ Հետագա ճանապարհորդությունն ունի առանձին ծրագիր ու պահանջներ։ արմմեյթը չի խոստանում կոնկրետ տեսարան, անսահմանափակ մուտք կամ երրորդ կողմի ծառայության հասանելիություն։",
        ),
        section(
          "Ասիստենտին փոխանցիր գործնական հարցերը",
          "Նշիր օրը, գիշերակացի վայրը, հետաքրքրություններն ու տեղաշարժի կարիքները։ Ասիստենտը կօգնի համեմատել տրանսպորտը, քննարկել կանգառները և հաղորդակցվել տեղական ծառայությունների հետ։ Անձնական ուղեկցումը խնդրիր առանձին։ Տրանսպորտը, սնունդը, տոմսերն ու մասնագետ գիդն ունեն իրենց արժեքը։",
        ),
      ],
      faq: [
        [
          "Արարատը հաստատ հստակ կերևա՞։",
          "Ոչ։ Տեսանելիությունը կախված է եղանակից ու պայմաններից։ Այցը պլանավորիր նաև վանքի հանդեպ հետաքրքրությանդ շուրջ, ոչ միայն հնարավոր տեսարանի։",
        ],
        [
          "Խոր Վիրապ այցելելը ներառո՞ւմ է Արարատի այցը։",
          "Ոչ։ Վանքը Հայաստանում է․ այնտեղից լեռը դիտելը լեռան այց կամ սահմանահատում չէ։",
        ],
        [
          "Կարո՞ղ եմ օգնություն ստանալ առանց ամբողջական տուրի։",
          "Այո։ Կարող ես քննարկել ճանապարհը, հաղորդակցումն ու լրացուցիչ ուղեկցումը։ Ծավալը, հասանելիությունն ու անհատական գինը համաձայնեցվում են նախապես։",
        ],
      ],
      sources: [monasterySource],
    },
  },
};

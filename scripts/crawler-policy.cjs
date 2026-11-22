// Search discovery and model training are independent choices.
// Preserve the site's existing permission for GPTBot; change only this flag
// if the owner later chooses to opt out of training. Search remains allowed.
const policy = {
  allowGPTBotTraining: true,
  searchAgents: [
    "Googlebot",
    "bingbot",
    "OAI-SearchBot",
    "PerplexityBot",
    "Claude-SearchBot",
  ],
};
function renderRobots(baseUrl, options = policy) {
  return `# Public search discovery. This is not a security boundary.\nUser-agent: *\nAllow: /\n\n# Search crawlers are managed separately from model training.\n${policy.searchAgents.map((agent) => `User-agent: ${agent}\nAllow: /\n`).join("\n")}\n# GPTBot is a separate training preference; existing permission is preserved.\nUser-agent: GPTBot\n${options.allowGPTBotTraining ? "Allow: /" : "Disallow: /"}\n\nSitemap: ${baseUrl}sitemap.xml\n`;
}
module.exports = { ...policy, renderRobots };

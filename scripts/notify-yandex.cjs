// Compatibility command for the explicit Yandex endpoint.
const path = require("node:path");
const { main } = require("./notify-indexnow.cjs");
main(process.argv.slice(2), {
  endpoint: "https://yandex.com/indexnow",
  reportPath: path.resolve(__dirname, "../qa/yandex-indexnow-submission.json"),
}).catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});

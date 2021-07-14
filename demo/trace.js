const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [],
  });

  const page = await browser.newPage();
  await page.tracing.start({ path: "trace.json" });
  await page.goto("https://www.baidu.com");
  await page.tracing.stop();

  browser.close();
})();

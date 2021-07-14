const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    devtools: true,
  });
  const page = await browser.newPage();
  await page.evaluateOnNewDocument(function () {
    console.log("page.evaluateOnNewDocument");
    const log = console.log;
    console.log = function (...par) {
      log("%c log ", "color: green;", ...par);
    };
  });
  await page.goto("https://www.baidu.com");
  await page.evaluate(async () => {
    console.log(window.navigator.userAgent);
  });

  await page.waitForTimeout(20000);
  await browser.close();
})();

const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();
  await page.goto("https://www.baidu.com", { waitUntil: "networkidle0" });
  const res = await page.metrics();
  console.log(res);
  browser.close();
})();

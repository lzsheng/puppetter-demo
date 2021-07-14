const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1400, height: 900 },
    args: ["--start-fullscreen"],
    devtools: true,
  });

  const page = await browser.newPage();
  await page.goto("https://www.baidu.com", {
    waitUntil: "networkidle0",
  });

  const performance = JSON.parse(
    await page.evaluate(() => {
      console.log("Hi, puppeteer");
      return JSON.stringify(window.performance.timing);
    })
  );
  console.log(performance);

  await page.waitForTimeout(5000);
  await browser.close();
})();

const puppeteer = require("puppeteer");

//使用 puppeteer.launch 启动 Chrome
(async () => {
  const browser = await puppeteer.launch({
    headless: false, //有浏览器界面启动
    slowMo: 100, //放慢浏览器执行速度，方便测试观察
    defaultViewport: { width: 1400, height: 900 },
    args: [
      //启动 Chrome 的参数，查看https://peter.sh/experiments/chromium-command-line-switches/
      "-–no-sandbox",
      "--window-size=1400,900"
    ],
  });
  const page = await browser.newPage();
  await page.goto("https://www.baidu.com");
  await page.close();
  await browser.close();
})();

// navigation.js
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false, //有浏览器界面启动
    slowMo: 200,
    defaultViewport: { width: 1400, height: 900 },
    args: ["--start-fullscreen"], //全屏打开页面
  });
  const page = await browser.newPage();
  await page.goto("https://www.baidu.com");
  await page.goto("https://juejin.cn/");
  await page.goBack(); // 回退
  await page.goForward(); // 前进
  await page.reload(); // 刷新
  await page.close();
  await browser.close();
})();
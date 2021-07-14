// navigationWait.js
const puppeteer = require("puppeteer");

//使用 puppeteer.launch 启动 Chrome
(async () => {
  const browser = await puppeteer.launch({
    headless: false, //有浏览器界面启动
    defaultViewport: { width: 1400, height: 900 },
    args: ["--start-fullscreen", "–no-first-run"], //全屏打开页面
  });

  let page = null;

  const pageAlert = async (page, pageMsg) => {
    await page.evaluate((msg) => {
      alert(msg);
    }, pageMsg);
  };

  // 默认 load 事件触发后认为加载完毕
  page = await browser.newPage();
  await page.goto("https://juejin.cn/");
  await pageAlert(page, "default");
  await page.close();

  // 通过waitUntil配置networkidle0
  page = await browser.newPage();
  await page.goto("https://juejin.cn/", {
    // waitUntil: 'load',              //等待 “load” 事件触发
    // waitUntil: 'domcontentloaded',  //等待 “domcontentloaded” 事件触发
    waitUntil: "networkidle0", //在 500ms 内没有任何网络连接
    // waitUntil: 'networkidle2'       //在 500ms 内网络连接个数不超过 2 个
  });
  await pageAlert(page, "waitUntil: networkidle0");
  await page.close();

  // 通过waitForTimeout
  page = await browser.newPage();
  await page.goto("https://juejin.cn/");
  await page.waitForTimeout(3000);
  await pageAlert(page, "waitForTimeout");
  await page.close();

  // 通过waitForResponse
  page = await browser.newPage();
  await page.goto("https://juejin.cn/");
  await page.waitForResponse(
    "https://i.snssdk.com/log/sentry/v2/api/slardar/batch/"
  );
  await pageAlert(page, "waitForResponse");
  await page.close();

  // 通过waitForSelector
  page = await browser.newPage();
  await page.goto("https://juejin.cn/");
  await page.waitForSelector(".entry-box");
  await pageAlert(page, "waitForSelector");
  await page.close();

  await browser.close();
})();

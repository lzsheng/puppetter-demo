const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false, //有浏览器界面启动
    defaultViewport: { width: 1400, height: 900 },
    args: ["--start-fullscreen"], //全屏打开页面
  });

  const page = await browser.newPage();
  await page.goto("https://juejin.cn/", { waitUntil: "networkidle0" });
  //对整个页面截图
  await page.screenshot({
    path: "./temp/capture.png", //图片保存路径
    type: "png",
    fullPage: true, //边滚动边截图
    // clip: {x: 0, y: 0, width: 1920, height: 800}
  });
  //对页面某个元素截图
  let element = await page.$(".logo");
  await element.screenshot({
    path: "./temp/element.png",
  });
  await page.close();
  await browser.close();
})();

const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false, //有浏览器界面启动
    slowMo: 100,
    defaultViewport: { width: 1400, height: 900 },
    args: ["--start-fullscreen"], //全屏打开页面
  });

  const page = await browser.newPage();
  await page.goto("https://juejin.cn/");

  await page.waitForSelector("button.login-button");
  const showLoginModalBtnEle = await page.$("button.login-button");
  await showLoginModalBtnEle.click();
  // 登录弹窗已渲染
  await page.waitForSelector("form.auth-form");

  // 点击 其他登录方式
  const otherLoginTypeEle = await page.$("span.clickable")
  await otherLoginTypeEle.click()

  // 输入账号
  const accountInputEle = await page.waitForSelector("input[name='loginPhoneOrEmail']");
  await accountInputEle.type("123456@qq.com", { delay: 20 });

  // 输入密码
  const pwdInputEle = await page.$("input[name='loginPassword']");
  await pwdInputEle.type("0099@&#123123", { delay: 20 });

  // 点击 登录 按钮
  const submitBtnEle = await page.$("form.auth-form .btn");
  await submitBtnEle.click();

  await page.waitForTimeout(5000);

  await page.close();
  await browser.close();
})();

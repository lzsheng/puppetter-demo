const puppeteer = require("puppeteer");
const mock = {
  err_no: 0,
  err_msg: "success",
  data: [
    {
      user_id: "3808363978174302",
      user_name: "我是模拟用户",
      got_digg_count: 7314,
      got_view_count: 506897,
      avatar_large:
        "https://sf6-ttcdn-tos.pstatp.com/img/user-avatar/bfc66a5d7055015e8c7f6b7944dfe747~300x300.image",
      company: "aaaaa",
      job_title: "公众号",
      level: 5,
      description: "https://github.com/newbee-ltd",
      author_desc: "",
      isfollowed: false,
    },
  ],
  cursor: "20",
  count: 99,
  has_more: true,
};

(async () => {
  const browser = await puppeteer.launch({
    headless: false, //有浏览器界面启动
    defaultViewport: { width: 1400, height: 900 },
    args: [
      "--start-fullscreen", // 全屏打开页面
      "--disable-web-security", // 禁用同源策略
    ],
  });

  const pages = await browser.pages();
  const page = pages[0];
  // 拦截请求
  await page.setRequestInterception(true);
  page.on("request", (interceptedRequest) => {
    if (
      interceptedRequest.url().indexOf("/user_api/v1/author/recommend") > -1
    ) {
      interceptedRequest.respond({
        status: 200,
        contentType: "application/json; charset=utf-8",
        body: JSON.stringify(mock),
      });
    }

    // https://github.com/puppeteer/puppeteer/issues/3853
    return Promise.resolve()
      .then(() => interceptedRequest.continue())
      .catch((e) => {});
  });

  await page.goto("https://juejin.cn/recommendation/authors/recommended");
  await page.waitForTimeout(5000);
  await browser.close();
})();

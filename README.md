# puppeteer-demo
` demo 说明`
``` bash
yarn
cd demo
```
运行单个demo
``` bash
cd demo
node metrics.js
node launch.js
...
```


# 相关学习文档

<div align=center>
<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aedc4d84c42345f0af7c7d4df9b5b36f~tplv-k3u1fbpfcp-watermark.image" width="140" height="auto" />
</div>


> 当前Puppeteer最新版本v10.0.0，Chromium 92.0.4512.0 (r884014)

## 简介 
.    
Puppeteer 是一个 Node 库，它提供了一个高级 API 来通过 DevTools Protocol（CDP）协议控制 Chromium 或 Chrome。Puppeteer 默认以 headless 模式运行，但是可以通过修改配置文件运行“有头”模式。
> Puppeteer is a Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol. Puppeteer runs headless by default, but can be configured to run full (non-headless) Chrome or Chromium.


### Puppeteer能做什么?
你可以在浏览器中手动执行的绝大多数操作都可以使用 Puppeteer 来完成！ 下面是一些示例：

> - 网页截图或者生成 PDF  
> - 爬取 SPA 或 SSR 网站  
> - UI 自动化测试，模拟表单提交，键盘输入，点击等行为  
> - 捕获网站的 timeline trace，用来帮助分析性能问题。  
> - 创建一个最新的自动化测试环境，使用最新的 js 和最新的 Chrome 浏览器运行测试用例  
> - 测试 Chrome 扩展程序  

### 什么是 Headless Chrome
在无界面的环境中运行 Chrome
通过命令行或者程序语言操作 Chrome
无需人的干预，运行更稳定
在启动 Chrome 时添加参数 --headless，便可以 headless 模式启动 Chrome
``` bash
# Mac OS X 命令别名 
alias chrome="/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome"  
# 开启远程调试 
chrome --headless --remote-debugging-port=9222 --disable-gpu
# 获取页面 DOM
chrome --headless --disable-gpu --dump-dom https://www.baidu.com
```

了解更多 [初探 Headless Chrome](https://zhuanlan.zhihu.com/p/27100187)


### Chrome DevTool Protocol
学习 Puppeteer 之前我们先来了解一下 Chrome DevTool Protocol
> - CDP 基于 WebSocket，利用 WebSocket 实现与浏览器内核的快速数据通道  
> - CDP 分为多个域（DOM，Debugger，Network，Profiler，Console...），每个域中都定义了相关的命令和事件（Commands and Events）  
> - 我们可以基于 CDP 封装一些工具对 Chrome 浏览器进行调试及分析，比如我们常用的 “Chrome 开发者工具” 就是基于 CDP 实现的  
> - 很多有用的工具都是基于 CDP 实现的，比如 Chrome 开发者工具，chrome-remote-interface，Puppeteer 等  
了解更多 [CDP入门教程](https://github.com/aslushnikov/getting-started-with-cdp/blob/master/README.md)

### Puppeteer API 分层结构
Puppeteer 中的 API 分层结构基本和浏览器保持一致，下面对常使用到的几个类介绍一下：


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e679b9aa98054ab6af622a3f19f6bd85~tplv-k3u1fbpfcp-watermark.image)

> - Puppeteer：使用DevTools Protocol（CDP）协议与浏览器通信。
> - Browser：对应一个浏览器实例，一个 Browser 可以包含多个 BrowserContext。
> - BrowserContext： 对应浏览器一个上下文会话，一个BrowserContext可以拥有多个Page。
> - Page：对应一个浏览器 Tab 页面，至少拥有一个Frame。
> - Frame：框架，每个Page有一个主框架（page.MainFrame()）,也可以多个子框架，主要由 iframe 标签创建产生的
> - ExecutionContext： 是 javascript 的执行环境，每一个 Frame 都有一个默认的 javascript 执行环境

## 安装
### puppeteer

当你安装 Puppeteer 时，它会下载最新版本的Chromium（~170MB Mac，~282MB Linux，~280MB Win），以保证可以使用 API。
``` bash
# 使用npm
npm i puppeteer 
# 使用yarn
yarn add puppeteer
```
### puppeteer-core
自 1.7.0 版本以来，官方维护团队都会发布一个 [puppeteer-core](https://www.npmjs.com/package/puppeteer-core) 包，这个包默认不会下载 Chromium。puppeteer-core 是一个的轻量级的 Puppeteer 版本，用于启动现有浏览器安装或连接到远程安装。

```bash
# 使用npm
npm i puppeteer-core 
# 使用yarn
yarn add puppeteer-core
```


## 常用的API介绍
### 如何创建一个 Browser 实例
- [puppeteer.launch([options])](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v10.0.0&show=api-puppeteerlaunchoptions)  
当 Puppeteer 连接到一个 Chromium 实例的时候可以通过 [puppeteer.launch](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v10.0.0&show=api-puppeteerlaunchoptions) 或 [puppeteer.connect](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v10.0.0&show=api-puppeteerconnectoptions) 创建一个 Browser 对象。

``` javascript
// launch.js
const puppeteer = require("puppeteer");

//使用 puppeteer.launch 启动 Chrome
(async () => {
  const browser = await puppeteer.launch({
    headless: false, //有浏览器界面启动
    slowMo: 100, //放慢浏览器执行速度，方便测试观察
    defaultViewport: { width: 1400, height: 900 },
    args: [
      //启动 Chrome 的参数，查看https://peter.sh/experiments/chromium-command-line-switches/
      "–no-sandbox",
      "--window-size=1400,900"
    ],
  });
  const page = await browser.newPage();
  await page.goto("https://www.baidu.com");
  await page.close();
  await browser.close();
})();
```


### 页面导航
- page.goto：打开新页面
- page.goBack ：回退到上一个页面
- page.goForward ：前进到下一个页面
- page.reload ：重新加载页面

```javascript
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
```


### 如何等待加载？
在实践中我们经常会遇到如何判断一个页面加载完成了，什么时机去截图，什么时机去点击某个按钮等问题，那我们到底如何去等待加载呢？

#### 加载导航页面
 - page.goto(url[, options]) ：打开新页面
 - page.goBack(url[, options])  ：回退到上一个页面
 - page.goForward(url[, options])  ：前进到下一个页面
 - page.reload(url[, options])  ：重新加载页面
 - page.waitForNavigation([options]) ：等待页面跳转
     - options
         - timeout <number> 跳转等待时间，单位是毫秒, 默认是30秒, 传 0 表示无限等待. 可以通过page.setDefaultNavigationTimeout(timeout)方法修改默认值
         - waitUntil <string|Array<string>> 满足什么条件认为页面跳转完成，默认是 load 事件触发时。指定事件数组，那么所有事件触发后才认为是跳转完成。事件包括：
             - load - 页面的load事件触发时
             - domcontentloaded - 页面的 DOMContentLoaded 事件触发时
             - networkidle0 - 不再有网络连接时触发（至少500毫秒后）
             - networkidle2 - 只有2个网络连接时触发（至少500毫秒后）


#### 等待元素、请求、响应
- page.waitForRequest(urlOrPredicate[, options]) 
等待指定的request发送时触发
- page.waitForResponse(urlOrPredicate[, options]) 
等待指定的response返回时触发
- page.waitForSelector(selector[, options]) 
等待指定的选择器匹配的元素出现在页面中
- page.waitForXPath(xpath[, options]) 
等待指定的xpath匹配的元素出现在页面中

``` javascript
// navigationWait.js
const puppeteer = require("puppeteer");

//使用 puppeteer.launch 启动 Chrome
(async () => {
  const browser = await puppeteer.launch({
    headless: false, //有浏览器界面启动
    defaultViewport: { width: 1400, height: 900 },
    args: ["--start-fullscreen"], //全屏打开页面
  });

  let page = null;

  // 暂时忽略该方法，后续会讲解
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
```


### 如何在浏览器环境中执行注入的javascript代码

- page.evaluate(pageFunction[, ...args])
    - pageFunction <function|string> 要在页面实例上下文中执行的方法
    - ...args <...Serializable|JSHandle> 要传给 pageFunction 的参数
    - 返回: <Promise<Serializable>> pageFunction执行的结果
如果pageFunction返回的是Promise，page.evaluate将等待promise完成，并返回其返回值。  
如果pageFunction返回的是不能序列化的值，将返回undefined

``` javascript
const puppeteerVar = 7; // puppeteer变量
const result = await page.evaluate(pageVar => {
  // 在浏览器中访问puppeteer变量
  console.log(8 * pageVar); // 在浏览器输出 56
  return Promise.resolve(8 * pageVar);
}, puppeteerVar);
console.log(result); // 在node日志输出 "56"
```


## 功能展示
### 截图 

[page.screenshot([options])](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v10.1.0&show=api-pagescreenshotoptions)

``` javascript
// screenshot.js
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
    // clip: {x: 0, y: 0, width: 1920, height: 800} // 指定裁剪区域
  });
  //对页面某个元素截图
  let element = await page.$('.logo');
  await element.screenshot({
      path: './temp/element.png'
  });
  await page.close();
  await browser.close();
})();
```


### 获取性能指标
#### tracing.start(options) & tracing.stop()
 - options
     - path 跟踪文件写入的路径
     - screenshots 捕获跟踪中的屏幕截图
     - categories  指定要使用的自定义类别替换默认值


使用 tracing.start 和 tracing.stop 创建一个可以在 Chrome DevTools or timeline viewer 中打开的跟踪文件。


``` javascript
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
```
把生成的trace.json放在chrome上就可以可视化查看报告了～～

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6da2747047334c76bcdeb7c14c3a958a~tplv-k3u1fbpfcp-watermark.image)


#### page.metrics()
> - Timestamp *时间点(when the metrics sample was taken)*
> - Documents *页面的documents数量。*
> - Frames *页面的frame数量。*
> - JSEventListeners *页面的js事件数量。*
> - Nodes *页面的dom节点数量。*
> - LayoutCount *整页面或部分页面的布局数量。*
> - RecalcStyleCount *页面样式重新计算数量。*
> - LayoutDuration *页面布局总时间。*
> - RecalcStyleDuration *页面样式重新计算总时间。*
> - ScriptDuration *页面js代码执行总时间。*
> - TaskDuration *页面任务执行总时间。*
> - JSHeapUsedSize *页面占用堆内存大小。*
> - JSHeapTotalSize *总的页面堆内存大小。*

``` javascript 
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
```


### 注入javascript代码

#### 在浏览器环境中执行javascript代码
 - page.evaluate(pageFunction[, ...args])
   - pageFunction  要在页面实例上下文中执行的方法
   - ...args  要传给 pageFunction 的参数
 返回: pageFunction执行的结果  
 该方法为 page.mainFrame().evaluate(pageFunction, ...args) 的简写

``` javascript 
// evaluate.js
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
```

#### page.evaluateOnNewDocument(pageFunction[, ...args])
指定的函数在所属的页面被创建并且所属页面的任意 script 执行之前被调用。常用于修改页面js环境，比如给 Math.random 设定种子等;   
> 例子： 重写console.log方法

``` javascript 
// evaluateOnNewDocument.js
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
```
> 浏览器Console输出
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dde74f711a7a4b1da8665f94e4c1d329~tplv-k3u1fbpfcp-watermark.image)

> 浏览器中的代码

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/384b5d67ad3c4be58e5f5e96b7945fb8~tplv-k3u1fbpfcp-watermark.image)


#### 在浏览器中，调用node.js的方法
[page.exposeFunction(name, puppeteerFunction)  ](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v10.1.0&show=api-pageexposefunctionname-puppeteerfunction)  
此方法添加一个命名为 name 的方法到页面的 window 对象 当调用 name 方法时，在 node.js 中执行 puppeteerFunction，并且返回 Promise 对象，解析后返回 puppeteerFunction 的返回值


> 例子：在js中调用node定义的方法 *readfile*
``` javascript 
// exposeFunction.js
const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    devtools: true,
  });
  const page = await browser.newPage();

  await page.exposeFunction("readfile", async (filePath) => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, "utf8", (err, text) => {
        console.log("fs.readFile");
        if (err) reject(err);
        else resolve(text);
      });
    });
  });

  const filePath = path.resolve("./exposeFunction.js");

  await page.evaluate(async (filePath) => {
    // 使用 window.readfile 读取文件内容
    console.log(window.readfile);
    const content = await window.readfile(filePath);
    document.querySelector("body").innerText = content;
  }, filePath);
    await page.waitForTimeout(10000);
    await browser.close();
})();
```

> 浏览器代码中只是定义了readfile为一个异步方法
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b2925a575aa451db9b41cf312eaf2a4~tplv-k3u1fbpfcp-watermark.image)


### 模拟登录

- [page.$(selector)](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v10.1.0&show=api-pageselector)
此方法在页面内执行 document.querySelector。如果没有元素匹配指定选择器，返回值是 null。
- [elementHandle.type(text[, options])](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v10.1.0&show=api-elementhandletypetext-options)
聚焦元素，然后为文本中的每个字符发送 keydown，keypress / input 和 keyup 事件。
- [elementHandle.click([options])](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v10.1.0&show=api-elementhandleclickoptions)
触发elementHandle对应的点击操作

> 模拟掘金的登陆
``` javascript
// login
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
  await accountInputEle.type("1@qq.com", { delay: 20 });

  // 输入密码
  const pwdInputEle = await page.$("input[name='loginPassword']");
  await pwdInputEle.type("0099@&#123123", { delay: 20 });

  // 点击 登录 按钮
  const submitBtnEle = await page.$("form.auth-form .btn");
  await submitBtnEle.click();

  await page.waitForTimeout(2000);

  await page.close();
  await browser.close();
})();
```


### 模拟不同设备
- [page.emulate(options)](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v10.1.0&show=api-pageemulateoptions)

> 模拟iPhone 6设备信息

``` javascript
// devices.js
const puppeteer = require("puppeteer");
const iPhone = puppeteer.devices["iPhone 6"]; // puppeteer.devices内置大量设备的预设定值

//使用 puppeteer.launch 启动 Chrome
(async () => {
  const browser = await puppeteer.launch({
    headless: false, //有浏览器界面启动
  });
  const page = await browser.newPage();
  await page.emulate(iPhone);
  await page.goto("https://www.taobao.com", { waitUntil: "networkidle0" });
 
  await browser.close();
})();
```




### 请求拦截

- [page.setRequestInterception(boolean)](https://zhaoqize.github.io/puppeteer-api-zh_CN/#?product=Puppeteer&version=v10.1.0&show=api-pagesetrequestinterceptionvalue)

启用请求拦截器，会激活 request.abort, request.continue 和 request.respond 方法。这提供了修改页面发出的网络请求的功能。  
一旦启用请求拦截，每个请求都将停止，除非它继续，响应或中止。

> 通过请求拦截器取消所有图片请求
``` javascript 
const puppeteer = require('puppeteer');

puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', interceptedRequest => {
    if (interceptedRequest.url().endsWith('.png') || interceptedRequest.url().endsWith('.jpg'))
      interceptedRequest.abort();
    else
      interceptedRequest.continue();
  });
  await page.goto('https://www.baidu.com');
  await browser.close();
});
```

> 修改 掘金-作者榜 的接口返回
``` javascript 
// requestInterception.js
const puppeteer = require("puppeteer");
const mock = {
  err_no: 0,
  err_msg: "success",
  data: [
    {
      user_id: "123123",
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
  // 请求拦截
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
```
> 修改接口后的页面展示效果
![WX20210714-150545@2x.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab807c130e8548638de259c9646a3bfa~tplv-k3u1fbpfcp-watermark.image)

*延伸：我们可以通过这个功能，做一些mock数据的读取逻辑，结合DOM结构识别 或 截图+AI识图 等功能，实现一些复杂的多状态的页面展示的UI测试*


## Puppeteer生态

- [中文Api文档](https://zhaoqize.github.io/puppeteer-api-zh_CN/)

- [Rize](https://github.com/g-plane/rize)
Rize 是一个提供顶层的、流畅并且可以链式调用的 API 的库，它能让您简单地使用 puppeteer。

- [jest-puppeteer](jest-puppeteer)
运行在Puppeteer上的Jest的测试库

- [mocha-headless-chrome](https://github.com/direct-adv-interfaces/mocha-headless-chrome)
运行在Puppeteer上的mocha测试库

- [expect-puppeteer](https://github.com/smooth-code/jest-puppeteer/tree/master/packages/expect-puppeteer)
基于Puppeteer的断言库

- [headless-chrome-crawler](https://github.com/yujiosaka/headless-chrome-crawler)
基于Puppeteer的分布式爬虫

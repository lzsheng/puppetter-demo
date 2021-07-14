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

require('chromedriver');
let webdriver = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');

(async function testCommon() {
  let driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
  try {
  } catch (err) {
    throw Error(err);
  }
}());
require('chromedriver');
let webdriver = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');

async function getAllItem() {
  let data = [];
  let driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
  try {
    (await driver).get("https://www.lazada.vn/#hp-just-for-you");

    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        let items = driver.findElements(webdriver.By.className("card-jfy-item")).then(async items => {
          for (let item of items) {
            let image = item.findElement(webdriver.By.className("card-jfy-image"));
            let itemDesc = item.findElement(webdriver.By.className("card-jfy-item-desc"));
            let modPrice = itemDesc.findElement(webdriver.By.className("hp-mod-price"));
            let modPriceSecond = modPrice.findElement(webdriver.By.className("hp-mod-price-second-line"));
            let modDiscount = modPriceSecond.findElements(webdriver.By.css("span"));
  
            let url = image.findElement(webdriver.By.className("image"))
                            .getAttribute("src")
                            .then(url => url)
                            .catch(err => "");
            let title = image.findElement(webdriver.By.className("image"))
                            .getAttribute("alt")
                            .then(url => url)
                            .catch(err => "");
            let discount = modDiscount
                            .then(dcs => dcs[3].getText()
                            .then(t => t.replace("-", ""))
                            .then(t => t.replace("%", "")))
                            .catch(err => "");
  
            data.push({
              url: await url,
              title: await title,
              discount: await discount
            });
          }

          resolve(data);
        });
      }, 10000);
    });

    return promise;
  } catch (err) {
    throw Error(err);
  }
};

async function lazadaTestOne(line) {
  if (line) {
    var amount = Number(line.split(" ")[0]);
    var discount = Number(line.split(" ")[1]);
  }
  let data = [];
  let finalData = [];

  let items = await getAllItem().then(items => items);

  if(items) {
    for(let item of items) {
      if(item.discount >= discount) {
        data.push(item);
      }
    }
  
    for(let i = 0; i < amount; i++) {
      finalData.push(data[i]);
    }
  
    return finalData;
  }
}

module.exports = {
  getAllItem: getAllItem,
  lazadaTestOne: lazadaTestOne
};
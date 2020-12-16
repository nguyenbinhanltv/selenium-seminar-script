const { Builder, By, until } = require("selenium-webdriver");
const fs = require("fs");

function readDataFromCsv(filename) {
  return new Promise((resolve, rejects) => {
    let results = [];
    fs.createReadStream(filename)
      .on("data", (data) => {
        let temp = data
          .toString()
          .split(/[,\r\n]/)
          .filter((x) => x != "");
        for (let i = 0; i < temp.length; i = i + 2) {
          results.push({
            id: temp[i],
            amount: temp[i + 1],
          });
        }
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", () => {
        rejects("Error");
      });
  });
}

async function writeToFile(productsTitle, productsPrice, productsAmout) {
  let result = [];
  for (let i = 0; i < productsTitle.length; i++) {
    let chunk = {
      title: await productsTitle[i].getText(),
      price: await productsPrice[i].getText(),
      amout: await productsAmout[i].getText(),
    };
    result.push(chunk);
  }
  fs.writeFile("result.json", JSON.stringify(result), (err) => {
    if (err) throw err;
  });
}

async function myFunction(filename) {
  try {
    let listProduct = Array.from(await readDataFromCsv(filename));
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://member.lazada.vn/user/login?");
    await driver.wait(
      until.urlContains("https://member.lazada.vn/user/profile#/")
    );

    for (let i = 0; i < listProduct.length; i++) {
      let x = listProduct[i];
      await driver.get("https://www.lazada.vn/products/" + x.id + ".html");
      let sfo = await driver.findElements(By.className("sfo__close"));
      if (sfo.length != 0) {
        await sfo[0].click();
      }

      let el = await driver.findElements(By.css('input[type="text"]'));
      let submitbtn = await driver.findElements(
        By.className("add-to-cart-buy-now-btn")
      );
      await el[0].click();
      await el[0].sendKeys(x.amount);
      await submitbtn[1].click();
    }
    await driver.get("https://cart.lazada.vn/cart?");
    let selectAllbtn = await driver.findElements(
      By.css('input[type="checkbox"]')
    );
    await selectAllbtn[0].click();
    await driver.get("https://checkout.lazada.vn/shipping?");
    let productsTitle = await driver.findElements(
      By.className("automation-link-from-title-to-prod title")
    );
    let productsPrice = await driver.findElements(
      By.className("current-price")
    );
    let productsAmout = await driver.findElements(
      By.className("item-quantity-value")
    );

    await writeToFile(productsTitle, productsPrice, productsAmout);
  } catch (e) {
    return {
      message: "Sản phẩm có thể đã hết hàng hoặc không thể đặt ngay bây giờ hoặc không tồn tại",
      code: 1,
    };
  }
}

module.exports = {
  ahihi: myFunction,
  readDataFromCsv: readDataFromCsv
}
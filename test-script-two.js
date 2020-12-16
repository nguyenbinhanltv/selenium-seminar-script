const assert = require("assert");
const chai = require("chai"),
expect = chai.expect,
should = chai.should();
const script = require("./script-two");
const fs = require("fs");

describe("Kịch bản 1: Tất cả sản phầm trong file csv đều thành công bỏ giỏ", () => {
  it("File json phải đủ các sản phẩm và số lượng khai báo trong csv", async () => {
    await script.ahihi("data.csv");
    let result = Array.from(JSON.parse(fs.readFileSync("./result.json")));
    let filecgv = Array.from(await script.readDataFromCsv('data.csv'));
    chai.assert.lengthOf(result, filecgv.length, '2 mang phai bang nhau');
  });
});

describe("Kịch bản 2: Có một sản phảm bị lỗi khi đặt (ví dụ: không tồn tại)", () => {
    it("Trong file data.csv có sản phẩm không tồn tại trên Lazada", async () => {
        let x = await script.ahihi("data_fake.csv");
        if(x.code == 1) {
            assert.ok(x.message);
        }
    });
});

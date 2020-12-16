const assert = require("assert");
const chai = require("chai"), expect = chai.expect, should = chai.should();
const scriptOne = require("./script-one");

const compareNumber = (number1, number2) => {
  return number1 >= number2;
}


describe("Kịch bản 1: Tìm 5 sản phẩm giảm giá trên 50% thành công", () => {
  it("Kết quả phải có 5 sản phẩm, mỗi sản phẩm phải giảm giá trên 50%", () => {
    scriptOne.lazadaTestOne("5 50")
      .then(data => {
        chai.assert.lengthOf(data, 5);
        for(let i of data) {
          expect(compareNumber(Number(i.discount), 50)).to.be.true;
        }
      });
  })
});

describe("Kịch bản 2: Tìm 100 sản phẩm giảm giá 100% thất bại", () => {
  it("Kết quả không có sản phẩm nào", () => {
    scriptOne.lazadaTestOne("100 100")
    .then(data => {
      chai.assert.lengthOf(data, 0);
    });
  });
});

describe("Kịch bản 3: Tìm 5 sản phẩm có giảm giá thành công", () => {
  it("Kết quả có 5 sản phẩm", () => {
    scriptOne.lazadaTestOne("5 0")
    .then(data => {
      chai.assert.lengthOf(data, 4);
      for(let i of data) {
        expect(compareNumber(Number(i.discount), 0)).to.be.true;
      }
    });
  });
});

describe("Kịch bản 3: Số lượng sản phẩm nhập vào sai hoặc giảm giá nằm ngoài vùng 0% -> 100%", () => {
  it("Số lượng sản phẩm sai", () => {
    scriptOne.lazadaTestOne("-5 0")
    .then(data => {
      expect(data).to.be.false;
    });
  });

  it("Giảm giá nằm ngoài vùng 0% -> 100%", () => {
    scriptOne.lazadaTestOne("5 -10")
    .then(data => {
      expect(data).to.be.false;
    });
  });
});
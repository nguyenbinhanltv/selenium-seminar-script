/*
WARNING !!!
DO NOT TOUCH THIS FILE
*/

const scriptOne = require("./script-one");
const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  scriptOne.lazadaTestOne(line).then(data => {
    fs.writeFile("result.json", JSON.stringify(data), (err) => {
      if (err) throw err;
    });
  });
});
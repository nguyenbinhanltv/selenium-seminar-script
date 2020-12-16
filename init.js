/*
WARNING !!!
DO NOT TOUCH THIS FILE
*/

const scriptOne = require("./script-one");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  scriptOne.lazadaTestOne(line).then(data => console.log(data));
});
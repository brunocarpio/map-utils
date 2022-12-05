const fs = require("fs");

let FF = fs.readFileSync("./ff-noheader.csv");
FF = FF.toString();

let obj = FF.split(/\n/)
	.filter((line) => line !== "")
	.map((line) => line.split("|"))
	.map((arr) => Object.assign({}, arr));

console.log(obj);

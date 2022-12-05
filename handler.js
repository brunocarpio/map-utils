const fs = require("fs");

let FF = fs.readFileSync("./ff.csv", { encoding: "utf-8" });

let splitted = FF.split(/\n/)
	.filter((line) => line !== "")
	.map((line) => line.split("|"));
// console.log(splitted);

let headers = splitted.shift();
// console.log(headers);

let obj = splitted
	.map((arr) => arr.map((elem, index) => [headers[index], elem]))
	.map((arr) => Object.fromEntries(arr));

console.log(obj);

const fs = require("node:fs");
const console = require("node:console");

const logger = new console.Console({
	stdout: fs.createWriteStream("info.logs"),
	stderr: fs.createWriteStream("errors.logs"),
});

module.exports = logger

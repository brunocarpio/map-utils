const http = require("node:http");
const url = require("node:url");
const { Console } = require("node:console");
const maps = require("./mapHandlers");
const fs = require("fs");

const logger = new Console({
	stdout: fs.createWriteStream("info.logs"),
	stderr: fs.createWriteStream("errors.logs"),
});

const HOST = "localhost";
const PORT = 3000;

let helloMessage = JSON.stringify({ message: "Hello from API v1!" });
let notFoundMessage = JSON.stringify({ error: "Resource not found" });

let responseHeaders = { "Content-Type": "application/json" };

function requestListener(request, response) {
	let { method, headers } = request;

	let parsedUrl = url.parse(request.url, true);
	logger.log("url", parsedUrl);
	logger.log("headers", headers);

	if (method === "POST" && parsedUrl.pathname === "/api/v1/ffToJson") {
		logger.log("POST /api/v1/ffToJson");
		let body = [];
		request
			.on("data", function (chunk) {
				body.push(chunk);
			})
			.on("end", function () {
				body = Buffer.concat(body).toString();
				logger.log("body", body);
				let hasHeaderRow = parsedUrl.query.hasHeaderRow === "true";
				logger.log("hasHeaderRow", hasHeaderRow);
				let json = maps.ffToJson(body, hasHeaderRow);
				response.writeHead(200, responseHeaders);
				response.end(json);
			});
	} else {
		response.writeHead(404, headers);
		response.end(notFoundMessage);
	}
}

const server = http.createServer(requestListener);

server.listen(PORT, function () {
	console.log(`Server listening on http://${HOST}:${PORT}`);
});

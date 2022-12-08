const http = require("node:http");
const url = require("node:url");
const { Console } = require("node:console");
const fs = require("node:fs");
const maps = require("./mapHandlers");

const logger = new Console({
	stdout: fs.createWriteStream("info.logs"),
	stderr: fs.createWriteStream("errors.logs"),
});

function requestListener(request, response) {
	let responseHeaders = { "Content-Type": "application/json" };
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
		response.writeHead(404, responseHeaders);
		response.end(JSON.stringify({ error: "Resource not found" }));
	}
}

const server = http.createServer(requestListener);

server.listen(
	{
		host: "localhost",
		port: 3000,
	},
	function () {
		console.log("Server listening on port 3000");
	}
);

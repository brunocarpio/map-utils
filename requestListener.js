const url = require("node:url");
const mappings = require("./mappings");
const logger = require("./logger");

function requestListener(request, response) {
	let responseHeaders = { "Content-Type": "application/json" };
	let { method, headers } = request;

	let parsedUrl = url.parse(request.url, true);
	logger.log("url", parsedUrl);
	logger.log("headers", headers);

	if (method === "POST" && parsedUrl.pathname === "/api/v1/ffToJson") {
		// console.log("POST /api/v1/ffToJson");
		logger.log("POST /api/v1/ffToJson");
		let body = [];
		request
			.on("data", function (chunk) {
				body.push(chunk);
			})
			.on("end", function () {
				body = Buffer.concat(body).toString();
				// console.log("body", body);
				logger.log("body", body);
				let hasHeaderRow = parsedUrl.query.hasHeaderRow === "true";
				let delimiter = parsedUrl.query.delimiter;
				logger.log("hasHeaderRow", hasHeaderRow);
				let json = mappings.ffToJson(body, hasHeaderRow, delimiter);
				response.writeHead(200, responseHeaders);
				response.end(json);
			});
	} else {
		response.writeHead(404, responseHeaders);
		response.end(JSON.stringify({ error: "Resource not found" }));
	}
}

module.exports = requestListener;

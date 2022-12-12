const http = require("node:http");
const getNetworkAddress = require("./networkAddress");
const listener = require("./requestListener");

const server = http.createServer(listener);

const port = 3000;

server.listen(port, function () {
	let host = getNetworkAddress();
	console.log(`Server listening on http://localhost:${port}`);
	console.log(`Server listening on http://${host}:${port}`);
});

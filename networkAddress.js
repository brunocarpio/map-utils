const os = require("node:os");
let networkInterfaces = os.networkInterfaces();
function getNetworkAddress() {
	return Object.values(networkInterfaces)
		.flat()
		.filter((o) => o.family === "IPv4" && !o.internal)
		.map((o) => o.address)
		.at(0);
}

module.exports = getNetworkAddress;

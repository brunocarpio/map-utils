function splitRows(ff) {
	return ff
		.split(/\n/)
		.filter((row) => row !== "")
		.map((row) => row.split("|"));
}

let mapHandlers = {
	ffToJson: function (ff, hasHeaderRow) {
		// console.log('ff', ff)
		// console.log('hasHeaderRow', hasHeaderRow)
		if (!hasHeaderRow) {
			let obj = splitRows(ff).map((arr) => Object.assign({}, arr));

			// console.log(obj);
			return JSON.stringify(obj);
		}

		let splittedRows = splitRows(ff);
		// console.log(splittedRows);

		let headers = splittedRows.shift();
		// console.log(headers);

		let obj = splittedRows
			.map((arr) => arr.map((elem, index) => [headers[index], elem]))
			.map((arr) => Object.fromEntries(arr));

		// console.log(obj);
		return JSON.stringify(obj);
	},
};

module.exports = mapHandlers;

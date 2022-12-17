function splitRows(ff, delimiter) {
	return ff
		.split(/\n/)
		.filter((row) => row !== "")
		.map((row) => row.split(delimiter));
}

let mappings = {
	ffToJson: function (ff, hasHeaderRow = true, delimiter = "|") {
		// console.log('ff', ff)
		// console.log('hasHeaderRow', hasHeaderRow)
		// console.log('delimiter', delimiter)

		let delimiterValues = [",", "|"];
		if (!delimiterValues.includes(delimiter)) {
			return JSON.stringify({ error: `delimiter not in ${delimiterValues}` });
		}

		if (!hasHeaderRow) {
			let obj = splitRows(ff, delimiter).map((arr) => Object.assign({}, arr));
			// console.log(obj);
			return JSON.stringify(obj);
		}

		let splittedRows = splitRows(ff, delimiter);
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

module.exports = mappings;

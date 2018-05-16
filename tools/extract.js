const path = require("path");
const React = require("react");
const {renderToString} = require("react-dom/server");
const styled = require("../lib/server").default;
const pretty = require("pretty");
const cssbeautify = require("cssbeautify");
const pify = require("pify");
const mkdirp = pify(require("mkdirp"));
const rimraf = pify(require("rimraf"));
const {writeFile} = pify(require("fs"));

const ROOT = process.cwd();
module.exports = async (
	{component, _component, fileName}, {outDir = "extract"}
) => {
  const OUT_DIR = path.resolve(ROOT, outDir);
	await rimraf(OUT_DIR);
	await mkdirp(OUT_DIR);
	let markup = ""
	try {
		markup = renderToString(React.createElement(component));
  } catch(err) {
    markup = renderToString(React.createElement(_component));
  }
	const sheet = new styled.ServerStyleSheet();
	const styles = sheet.getStyles();

	console.info(`Preparing: ${fileName}`);
	const outFile = path.resolve(OUT_DIR, fileName);
	const {ext} = path.parse(fileName);
	if (ext === ".css") {
		const result = cssbeautify(styles, {});
		await writeFile(outFile, result);
		console.info(`Rendering: ${path.resolve(OUT_DIR, fileName)}`);
	} else if (ext === ".html") {
		await writeFile(outFile, pretty(markup));
		console.info(`Rendering: ${path.resolve(OUT_DIR, fileName)}`);
	}
};

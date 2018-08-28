const path = require("path");
const React = require("react");
const {renderToString} = require("react-dom/server");
const pretty = require("pretty");
const cssbeautify = require("cssbeautify");
const pify = require("pify");
const mkdirp = pify(require("mkdirp"));
const {writeFile} = pify(require("fs"));
const decamelize = require("decamelize");

const styled = require("../lib").default;
const log = require("./logger").default;
const ROOT = process.cwd();

const renderComponent = (a, b) => {
	let markup = "";
	try {
		markup = renderToString(React.createElement(a));
	} catch (err) {
		markup = renderToString(React.createElement(b));
	}
	return markup;
};

module.exports = async (
	{component, _component, fileName},
	{outDir = "extract"}
) => {
	const {ext, name} = path.parse(fileName);
	const OUT_DIR = path.resolve(ROOT, outDir, decamelize(name, "-"));
	const sheet = new styled.ServerStyleSheet();

	await mkdirp(OUT_DIR);
	if (ext === ".css") {
		const outFile = path.resolve(OUT_DIR, "styles.css");
		renderComponent(component, _component);
		const styles = sheet.getStyles();
		const result = cssbeautify(styles, {});
		await writeFile(outFile, result);
		log.info(`Created: ${outFile}`);
	} else if (ext === ".html") {
		const htmlFile = path.resolve(OUT_DIR, "template.html");
		const cssFile = path.resolve(OUT_DIR, "style.css");
		// clean styles
		sheet.collectStyles();
		const markup = renderComponent(component, _component);
		const styles = sheet.getStyles();
		const htmlResult = pretty(markup, {});
		const cssResult = cssbeautify(styles, {});
		await writeFile(cssFile, cssResult);
		log.info(`Created: ${cssFile}`);
		await writeFile(htmlFile, htmlResult);
		log.info(`Created: ${htmlFile}`);
	}
};

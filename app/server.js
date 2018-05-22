const path = require("path");
const {writeFile} = require("fs");
const React = require("react");
const {renderToString} = require("react-dom/server");
const {minify} = require("html-minifier");
const pretty = require("pretty");
const App = require("./app");
const styled = require("../").default;
const log = require("../tools/logger").default;

const markup = renderToString(React.createElement(App));
const sheet = new styled.ServerStyleSheet();
const styles = sheet.getStyleTags();
const template = html => `
<!DOCTYPE html>
<html lang="en">
<head>
		<meta charset="UTF-8">
		<title>Generate UI kits with React</title>
		${styles}
</head>
<body>
		<div id="app">${html}</div>
</body>
</html>
`;
log.info("Rendering to static");

const html = template(markup);

writeFile(
	path.resolve(__dirname, "index.html"),
	minify(html, {
		sortAttributes: true,
		minifyCSS: false,
		collapseWhitespace: true,
		removeAttributeQuotes: false,
		sortClassName: false
	}),
	err => {
		if (err) {
			log.error(err);
			return;
		}
		log.info(
			`Render to static is done: ${path.resolve(__dirname, "index.html")}`
		);
	}
);

writeFile(path.resolve(__dirname, "pretty.html"), pretty(html), err => {
	if (err) {
		log.error(err);
		return;
	}
	log.info(
		`Render to static is done: ${path.resolve(__dirname, "pretty.html")}`
	);
});

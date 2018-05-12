const path = require("path");
const {writeFile} = require("fs");
const React = require("react");
const {renderToString} = require("react-dom/server");
const App = require("./app");
const styled = require("../").default;
const pretty = require("pretty");
var minify = require("html-minifier").minify;

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
console.info("Rendering to static");

const html = template(markup);

writeFile(
	path.resolve(__dirname, "index.html"),
	minify(html, {
		sortAttributes: true,
		minifyCSS: true,
		collapseWhitespace: true,
		removeAttributeQuotes: false,
		sortClassName: false
	}),
	err => {
		if (err) {
			console.error(err);
			return;
		}
		console.info(
			`Render to static is done: ${path.resolve(__dirname, "index.html")}`
		);
	}
);

writeFile(path.resolve(__dirname, "pretty.html"), pretty(html), err => {
	if (err) {
		console.error(err);
		return;
	}
	console.info(
		`Render to static is done: ${path.resolve(__dirname, "pretty.html")}`
	);
});

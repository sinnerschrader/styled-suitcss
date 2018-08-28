const React = require("react");
const {renderToString} = require("react-dom/server");

const styled = require("../lib").default;

const test = require("ava");

const Element = styled.div({
	_name: "Element"
})`
 display: block;
`;

const NSElement = styled.div({
	_namespace: "namespace",
	_name: "Element"
})`
 display: block;
`;

const Modifier = Element.extend({
	_name: "modifier"
})`
 color: red;
`;

const NSModifier = NSElement.extend({
	_name: "modifier"
})`
 color: red;
`;

const Child = styled.span({
	_name: "Child"
})`
 display: inline-block;
`;

const ElementChild = Child.extend({
	_parent: Element
})`
  padding: 5px;
`;

const ElementChildModifier = ElementChild.extend({
	_name: "modifier"
})`
  margin: 5px;
`;

const NSElementChild = Child.extend({
	_parent: NSElement
})`
  padding: 5px;
`;

const NSElementChildModifier = NSElementChild.extend({
	_name: "modifier"
})`
  margin: 5px;
`;

test("Element renders the correct markup", t => {
	const markup = renderToString(React.createElement(Element));

	const expected = '<div class="Element" data-reactroot=""></div>';
	t.is(markup, expected);
});

test("Element--modifier renders the correct markup", t => {
	const markup = renderToString(React.createElement(Modifier));
	const expected =
		'<div class="Element Element--modifier" data-reactroot=""></div>';
	t.is(markup, expected);
});

test("Element-child renders the correct markup", t => {
	const markup = renderToString(React.createElement(ElementChild));
	const expected =
		'<span class="Child Element-child" data-reactroot=""></span>';
	t.is(markup, expected);
});

test("Element-child--modifier renders the correct markup", t => {
	const markup = renderToString(React.createElement(ElementChildModifier));
	const expected =
		'<span class="Child Element-child Element-child--modifier" data-reactroot=""></span>';
	t.is(markup, expected);
});

test("namespace-Element renders the correct markup", t => {
	const markup = renderToString(React.createElement(NSElement));
	const expected = '<div class="namespace-Element" data-reactroot=""></div>';
	t.is(markup, expected);
});

test("namespace-Element--modifier renders the correct markup", t => {
	const markup = renderToString(React.createElement(NSModifier));
	const expected =
		'<div class="namespace-Element namespace-Element--modifier" data-reactroot=""></div>';
	t.is(markup, expected);
});

test("namespace-Element-child renders the correct markup", t => {
	const markup = renderToString(React.createElement(NSElementChild));
	const expected =
		'<span class="Child namespace-Element-child" data-reactroot=""></span>';
	t.is(markup, expected);
});

test("namespace-Element-child--modifier renders the correct markup", t => {
	const markup = renderToString(React.createElement(NSElementChildModifier));
	const expected =
		'<span class="Child namespace-Element-child namespace-Element-child--modifier" data-reactroot=""></span>';
	t.is(markup, expected);
});

test("Styles are created correctly", t => {
	const sheet = new styled.ServerStyleSheet();
	const markup = renderToString(
		React.createElement(sheet.collectStyles(Element))
	);
	const styles = sheet.getStyles();
	const expected = "/* Element */\n.Element{display:block;}\n";
	t.is(styles, expected);
});

test("Styles are gathered correctly", t => {
	const sheet = new styled.ServerStyleSheet();
	const markup = renderToString(
		React.createElement(sheet.collectStyles(ElementChild))
	);
	const styles = sheet.getStyles();
	const expected =
		"/* Child */\n.Child{display:inline-block;}\n/* Element-child */\n.Element-child{padding:5px;}\n";
	t.is(styles, expected);
});

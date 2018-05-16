const path = require("path");
const globby = require("globby");
const React = require("react");
const extract = require("./extract");

const ROOT = path.resolve(process.cwd());
module.exports = (FILE_GLOB, {outDir}) => {
	const pattern = path.join(ROOT, FILE_GLOB);
	globby(pattern).then(files => {
		const collection = files
			.map(file => {
				return require(file);
			})
			.reduce((a, b) => ({...a, ...b}), {});
		const items = Object.keys(collection).map(name => {
				 const component = React.createElement(collection[name], {children: name});
         const _component = React.createElement(collection[name], {src: "https://placehold.it/200"});
			return {
        name,
        component,
        _component
      }
		});
		extract(
			{
        component: () =>
          React.createElement(
            React.Fragment,
            {},
            ...items.map(x => x.component)
          ),
        _component: () =>
          React.createElement(
            React.Fragment,
            {},
            ...items.map(x => x._component)
          ),
				fileName: `styles.css`
			},
      {outDir}
		);
		items.forEach(item => {
        extract(
          {
            component: () =>
              React.createElement(React.Fragment, {}, item.component),
            _component: () =>
              React.createElement(React.Fragment, {}, item._component),
            fileName: `${item.name}.html`
          },
          {outDir}
        );
		});
	});
};

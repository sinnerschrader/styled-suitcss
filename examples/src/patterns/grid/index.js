const React = require("react");
const styled = require("../../../..").default;

const Grid = styled.div({
	_namespace: "s2",
	_name: "Grid"
})`
  display: flex;
  flex-wrap: wrap;
`;

const Column = styled.div({
	_name: "Column"
})`
  flex: 0 0 calc(100% / var(--columns, 4));
`;

const GridColumn = Column.extend({
	_parent: Grid
})`
  --columns: 8;
`;

const NSColumn = Column.extend({
	_namespace: "boo"
})`
  --columns: 12;
`;

module.exports = {
	Grid,
	Column,
	GridColumn,
	NSColumn
};

const styled = require("../..").default;

const Layout = styled.div({
	_namespace: "my",
	_name: "Layout"
})`
  display: grid;
`;

const LayoutQuad = Layout.extend({
	_name: "4"
})`
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  
  @media (max-width: 50em) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
`;

module.exports = {
	Layout,
	LayoutQuad
};

const {keyframes} = require("../");

const blink = keyframes({
	_namespace: "animation",
	_name: "Blink"
})`
  from {
  	opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const shake = keyframes({
	_namespace: "animation",
	_name: "Shake"
})`
  from {
  	transform: rotate(-10deg);
  }
  to {
  	transform: rotate(10deg);
  }
`;

module.exports = {
	blink,
	shake
};

const {createElement} = require("react");
const {Card} = require("./../patterns/card");
const {Input} = require("./../patterns/input");
const {Image} = require("./../patterns/image");
const {Button} = require("./../patterns/button");

const ImageCard = () =>
	createElement(
		Card,
		null,
		createElement(Image, {
			src: "{{img.src}}",
			alt: "{{img.alt}}"
		}),
		createElement(Input, {
			type: "text",
			placeholder: "{{input.placeholder}}"
		}),
		createElement(Button, {type: "button"}, "{{cancel}}"),
		createElement(Button, {type: "submit"}, "{{confirm}}")
	);
module.exports = {
	ImageCard
};

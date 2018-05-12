import {htmlAttributes, svgElements} from "./elements";
import {isTruthy} from "./utils";

const dataOrAria: (str: string) => boolean = (str: string) =>
	str === "data-" || str === "aria-";

const getTagAttributes = (tag: string) => {
	const validAttributes: string[] = htmlAttributes["*"].concat(
		htmlAttributes[tag]
	);
	if (svgElements.includes(tag)) {
		return validAttributes.concat(htmlAttributes.svg);
	}
	return validAttributes;
};
const getValidAttributes: (str: string, tag: string) => boolean = (
	str: string,
	tag: string
) => isTruthy(str, getTagAttributes(tag)) || dataOrAria(str.substr(0, 5));

export default getValidAttributes;

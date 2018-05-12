import {htmlAttributes, svgElements} from "./elements";
import {isTruthy, isHandler, dataOrAria} from "./utils";

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
): boolean => {
	const validAttribute = isTruthy(str, getTagAttributes(tag));
	const dataOrAriaAttribute = dataOrAria(str.substr(0, 5));
	const handlerAttribute = isHandler(str.substr(0, 3));
	return validAttribute || dataOrAriaAttribute || handlerAttribute;
};

export default getValidAttributes;

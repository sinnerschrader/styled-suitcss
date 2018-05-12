/* global document */
const styleElement = (doc: any): Element => {
	if (doc === null) {
		return null;
	}
	const existingElement = doc.querySelector("style[data-styled-bem]");
	if (existingElement) {
		return existingElement;
	}
	const style = doc.createElement("style");
	style.setAttribute("data-styled-bem", "");
	return style;
};

export default styleElement;

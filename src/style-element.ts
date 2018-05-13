/* global document */

export const NAMESPACE = "data-styled-uikit";
const styleElement = (doc: any): Element => {
	if (doc === null) {
		return null;
	}
	const existingElement = doc.querySelector(`style[${NAMESPACE}]`);
	if (existingElement) {
		return existingElement;
	}
	const style = doc.createElement("style");
	style.setAttribute(NAMESPACE, "");
	return style;
};

export default styleElement;

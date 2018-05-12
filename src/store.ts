import styleElement from "./style-element";
import {sortbyNames} from "./utils";
const Stylis = require("stylis");

export const stylis = new Stylis({
	keyframe: false,
	prefix: true,
	preserve: true,
	compress: false
});

class Store {
	selectors: string[] = [];

	styles: string[] = [];

	styleElement: Element | null = null;

	constructor(props: {document: any} = {document: null}) {
		this.styleElement = styleElement(props.document);
		if (props.document) {
			this.append(props.document.head);
		}
	}

	/**
	 * Add new styles to existing collection.
	 * Only new selectors are allowed to add styles.
	 * First come first serve.
	 * @param {string} selector
	 * @param {string} style
	 */
	addStyle(selector: string, style: string) {
		if (!this.selectors.includes(selector)) {
			this.selectors.push(selector);
			this.styles.push(stylis(`.${selector}`, style));
			this.styles = this.styles.sort(sortbyNames);
			this.selectors = this.selectors.sort(sortbyNames);
			if (this.styleElement) {
				this.styleElement.innerHTML = this.styles.join("");
			}
		}
	}

	append(el) {
		el.appendChild(this.styleElement);
	}
}

export default Store;

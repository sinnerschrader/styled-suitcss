import styleElement, {NAMESPACE} from "./style-element";
import {sortByNames} from "./utils";
const Stylis = require("stylis");

export declare type AddStyle = (selector: string, style: string) => void;

export interface StyleStore {
	addStyle: AddStyle;
	addKeyframes?: AddStyle;
	updateStyleSheet?: () => void;
	append?: (el: Element) => void;
	selectors?: string[];
	keyframes?: string[];
	styles?: string[];
	animations?: string[];
	styleElement?: Element | null;
	appended?: boolean;
}

export const stylis = new Stylis({
	keyframe: false,
	prefix: true,
	preserve: true,
	compress: false
});

class Store {
	selectors: string[] = [];
	keyframes: string[] = [];

	styles: string[] = [];
	animations: string[] = [];

	styleElement: Element | null = null;

	appended: boolean = false;

	constructor(props: {document: any} = {document: null}) {
		this.styleElement = styleElement(props.document);
		if (props.document) {
			const [selectors = "", keyframes = ""] = (
				this.styleElement.getAttribute(NAMESPACE) || ""
			).split("|");
			const [
				styles = "",
				animations = ""
			] = this.styleElement.innerHTML.split(".___{content:normal}");
			this.selectors = selectors.split(",");
			this.keyframes = keyframes.split(",");
			this.styles.push(styles);
			this.animations.push(animations);
			if (!this.appended) {
				this.appended = this.append(props.document.head);
			}
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
			this.styles = this.styles.sort(sortByNames);
			this.selectors = this.selectors.sort(sortByNames);
			this.updateStyleSheet();
		}
	}

	addKeyframes(name: string, style: string) {
		if (!this.keyframes.includes(name)) {
			this.keyframes.push(name);
			this.animations.push(stylis("", `@keyframes ${name} {${style}`));
			this.animations = this.animations.sort(sortByNames);
			this.keyframes = this.keyframes.sort(sortByNames);
			this.updateStyleSheet();
		}
	}

	updateStyleSheet() {
		if (this.styleElement) {
			this.styleElement.innerHTML = this.styles
				.concat(this.animations)
				.join("");
		}
	}

	append(el) {
		el.appendChild(this.styleElement);
		return Boolean(el) && Boolean(this.styleElement);
	}
}

export default Store;

import {AddStyle} from "./add-style";

export interface StyleStore {
	addStyle: AddStyle;
	append?: (el: Element) => void;
	selectors?: string[];
	styles?: string[];
	styleElement?: Element | null;
}

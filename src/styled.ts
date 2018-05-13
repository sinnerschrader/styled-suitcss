import elements, {svgElements} from "./elements";

import {InitialProps, CreateElement, StyleInterpolation} from "./styled-component";

export declare type StyledDef = (strings: string[], ...args: any[]) => any;

class Styled {
	createElement: CreateElement = () => null;
	styled = (tagName: string, initialProps: InitialProps): StyledDef => (
		strings: string[],
		...args: (string | StyleInterpolation)[]
	): CreateElement =>
		this.createElement(strings, args, tagName, initialProps);
	constructor() {
		[...elements, ...svgElements].forEach(tagName => {
			this.styled[tagName] = (initialProps: InitialProps) =>
				this.styled(tagName, initialProps);
		});
	}
}

export default Styled;

import elements, {svgElements} from "./elements";

import {InitialProps} from "./initial-props.d";
import {CreateElement} from "./create-element.d";
import {StyledDef} from "./styled-def.d";
import {StyleInterpolation} from "./style-interpolation.d";

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

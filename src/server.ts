import createElement, {store} from "./server-element";
import StyledBase from "./styled";

import {CreateElement} from "./create-element.d";

class Styled extends StyledBase {
	createElement: CreateElement = createElement;
}

const {styled}: any = new Styled();

styled.ServerStyleSheet = class ServerStyleSheet {
	getStyleTags(): string {
		return `<style data-styled-bem="${store.selectors.join(
			","
		)}">${store.styles.join("")}</style>`;
	}
	collectStyles(input: any): any {
		return input;
	}
};

export default styled;

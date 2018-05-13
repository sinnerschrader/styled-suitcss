import createElement, {store} from "./server-element";
import StyledBase from "./styled";
import {NAMESPACE} from "./style-element";
import {CreateElement, InitialProps} from "./styled-component";

class Styled extends StyledBase {
	createElement: CreateElement = createElement;
}

const {styled}: any = new Styled();

styled.ServerStyleSheet = class ServerStyleSheet {
	getStyleTags(): string {
		const selectors = store.selectors.join(",");
		const keyframes = store.keyframes.join(",");
		const styles = store.styles.join("");
		const animations = store.animations.join("");
		return `<style ${NAMESPACE}="${selectors}|${keyframes}">${styles}${".___{content:normal}"}${animations}</style>`;
	}
	collectStyles(input: any): any {
		return input;
	}
};

export {keyframes} from "./server-element";

export default styled;

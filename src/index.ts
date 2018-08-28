import createElement, {store, keyframes} from "./create-element";
import StyledBase from "./styled";
import {CreateElement, InitialProps} from "./styled-component";
import {NAMESPACE} from "./style-element";
import {SEPARATOR} from "./constants";

class Styled extends StyledBase {
	createElement: CreateElement = createElement;
}

const {styled}: any = new Styled();

styled.ServerStyleSheet = class ServerStyleSheet {
	getStyleTags(): string {
		const selectors = store.selectors.join(",");
		const keyframes = store.keyframes.join(",");
		const styles = store.styles.join("\n");
		const animations = store.animations.join("\n");
		return `<style ${NAMESPACE}="${selectors}|${keyframes}">${styles}\n${SEPARATOR}\n${animations}</style>`;
	}
	getStyles(): string {
		const styles = store.styles.join("\n");
		const animations = store.animations.join("\n");
		return `${styles}\n${animations}`;
	}
	collectStyles(input: any): any {
		store.selectors = [];
		store.keyframes = [];
		store.styles = [];
		store.animations = [];
		return input;
	}
};

export {keyframes};
export default styled;

import createElement, {store} from "./client-element";
import StyledBase from "./styled";
import {NAMESPACE} from "./style-element";
import {CreateElement, InitialProps} from "./styled-component";

class Styled extends StyledBase {
	createElement: CreateElement = createElement;
}

const {styled}: any = new Styled();

export {keyframes} from "./client-element";
export default styled;

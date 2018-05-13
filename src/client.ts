import createElement from "./client-element";
import StyledBase from "./styled";

import {CreateElement, InitialProps} from "./styled-component";

class Styled extends StyledBase {
	createElement: CreateElement = createElement;
}

const {styled} = new Styled();

export {keyframes} from "./client-element";
export default styled;

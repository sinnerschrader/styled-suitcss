import createElement from "./client-element";
import StyledBase from "./styled";

import {CreateElement} from "./create-element.d";

class Styled extends StyledBase {
	createElement: CreateElement = createElement;
}

const {styled} = new Styled();

export {handleState} from "./utils";

export default styled;

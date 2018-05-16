const React = require("react");
const styled = require("../..").default;
const {blink, shake} = require("../animations");
const {COLORS, ICONS} = require("../design-system");
const Card = styled.div({
	_name: "Card"
})`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin: 1rem;
  font-size: 1rem;
  font-family: sans-serif;
  border-radius: 3px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.6);
`;

const WhiteCard = Card.extend({
	_name: "white"
})`
  color: black;
  background-color: white;
`;

const BlueCard = Card.extend({
	_name: "blue"
})`
  background-color: ${COLORS.blue};
  color: #fff;
`;

const YellowCard = Card.extend({
	_name: "yellow"
})`
  background-color: ${COLORS.yellow};
  color: #000;
`;

const PurpleCard = Card.extend({
	_name: "purple"
})`
  background-color: ${COLORS.purple};
  color: #fff;
`;

const WarningCard = Card.extend({
	_name: "warning"
})`
  background-color: ${COLORS.red};
  color: #fff;
`;

const SuccessCard = Card.extend({
	_name: "success"
})`
  background-color: ${COLORS.green};
  color: #fff;
`;

const Image = styled.img({
	_name: "Image"
})`
  display: block;
`;

const CardImage = Image.extend({
	_namespace: "Card"
})`
  width: 100%;
`;

const FitCardImage = Image.extend({
	_name: "fix"
})`
  width: calc(100% + 2rem);
  margin: -1rem -1rem 1rem -1rem;
  height: auto;
  border-radius: 3px 3px 0 0;
`;

const SmallCardImage = CardImage.extend({
	_name: "small"
})`
  width: 50%;
  float: left;
  margin: 0 1em 1em 0;
`;

const Copy = styled.p({
	_name: "Copy"
})`
	margin: 0;
`;

const CardCopy = Copy.extend({
	_namespace: "Card"
})`
	font-size: 1rem;
`;

const Headline = styled.h2({
	_name: "Headline"
})`
	margin: 0;
	font-size: 2rem;
`;

const CardHeadline = Headline.extend({
	_namespace: "Card"
})`
  margin-bottom: 1rem;
`;

const Svg = styled.svg({
	_name: "Svg"
})`
  overflow: visible;
`;

const IconSvg = Svg.extend({
	_namespace: "Icon",
	viewBox: "0 0 24 24"
})`
  height: 1em;
  width: 1em;
`;

const Path = styled.path({
	_name: "Path"
})`
  fill: currentColor;
`;

const IconType = props =>
	React.createElement(
		IconSvg,
		props,
		React.createElement(Path, {d: props.iconType})
	);

const Icon = styled.span({
	_name: "Icon",
	_children: props => React.createElement(IconType, props)
})`
  display: inline-flex;
`;

const Button = styled.button({
	_name: "Button"
})`
  display: inline-flex;
  background: ${COLORS.theme};
  color: #fff;
  padding: 0.5em 1em;
  margin: 0.5em;
  font-size: 1em;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  
  &:hover {
 		 border-color: rgba(0, 0, 0, 0.6);
 		 background-image: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2));
  }
  
  &:active {
 		 border-color: rgba(0, 0, 0, 0.8);
 		 background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4));
  }
  
  &:focus {
 		 box-shadow: 0 0 3px 3px highlight;
 		 outline: 0;
  }
  
  &.is-selected {
 		 box-shadow: 0 0 0 2px #fff, 0 0 0 5px rgba(55, 55, 255, 0.9);
 		 outline: 0;
  }
  
  &.is-special {
 		 background-color: ${COLORS.blue};
  }
  
  &.is-blinking {
  	animation: ${blink} 0.5s steps(2, end) infinite alternate;
  }
  
  &.is-shaking {
  	animation: ${shake} 0.5s ease-in-out infinite alternate;
  }
 
`;

const ButtonIcon = Icon.extend({
	_namespace: "Button"
})`
  margin-right: 0.5em;
`;

const CardButton = Button.extend({
	_namespace: "Card"
})`
  width: 100%;
  margin: 0.5em 0;
  justify-content: center;
`;

const IconCardButton = CardButton.extend({
	_name: "icon",
	_children: props => React.createElement(ButtonIcon, props)
})`
  padding-left: 0.5em;
`;

module.exports = {
	Button,
	ButtonIcon,
	Card,
	CardHeadline,
	CardButton,
	CardCopy,
	CardImage,
	Copy,
	Headline,
	FitCardImage,
	Icon,
	IconCardButton,
	SmallCardImage,
	SuccessCard,
	WarningCard,
	BlueCard,
	YellowCard,
	PurpleCard,
	WhiteCard
};

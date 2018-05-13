const React = require("react");
const {default: styled, keyframes} = require("../");

const COLORS = {
	theme: "hsla(-90, 50%, 30%, 1)",
	red: "hsla(-10, 50%, 40%, 1)",
	green: "hsla(120, 70%, 30%, 1)",
	yellow: "hsla(40, 50%, 70%, 1)",
	purple: "hsla(-60, 50%, 50%, 1)",
	blue: "hsla(220, 50%, 50%, 1)"
};

const blink = keyframes({
	_namespace: "Animation",
	_name: "Blink"
})`
  from {
  	opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const shake = keyframes({
	_namespace: "Animation",
	_name: "Shake"
})`
  from {
  	transform: rotate(-10deg);
  }
  to {
  	transform: rotate(10deg);
  }
`;

const ICONS = {
	like:
		"M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z",
	dislike:
		"M19,15H23V3H19M15,3H6C5.17,3 4.46,3.5 4.16,4.22L1.14,11.27C1.05,11.5 1,11.74 1,12V14A2,2 0 0,0 3,16H9.31L8.36,20.57C8.34,20.67 8.33,20.77 8.33,20.88C8.33,21.3 8.5,21.67 8.77,21.94L9.83,23L16.41,16.41C16.78,16.05 17,15.55 17,15V5C17,3.89 16.1,3 15,3Z"
};

const Layout = styled.div({
	_namespace: "MY_NAMESPACE",
	_name: "Layout"
})`
  display: grid;
`;

const LayoutQuad = Layout.extend({
	_name: "4"
})`
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  
  @media (max-width: 50em) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
`;

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
 		 background-color: ${COLORS.blue}
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

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		this.setState(prevState => ({
			selected: !prevState.selected
		}));
	}

	render() {
		return React.createElement(
			LayoutQuad,
			{},
			React.createElement(
				BlueCard,
				{"data-attribute": "It Works!"},
				React.createElement(CardHeadline, {}, "Lorem ipsum dolor!"),
				React.createElement(
					CardCopy,
					{},
					React.createElement(SmallCardImage, {
						src: "https://placehold.it/300x300/392929/bababf",
						alt: "Placeholder image"
					}),
					"Consectetur adipisicing elit accusantium aliquam consequuntur, dolore dolorem esse eum itaque iure laudantium, magnam provident quis soluta vel voluptates? Nam numquam pariatur quam repellendus soluta.",
					"Architecto consequuntur eligendi, et ex fugit libero officia, quas quis quos ratione reprehenderit sed tempore vero. Deserunt ducimus expedita libero nam quaerat.",
					"Ad corporis, culpa cum dolores eligendi id itaque laboriosam, molestiae necessitatibus nisi, officiis praesentium temporibus vero.",
					"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, consequatur corporis, culpa cum earum est libero necessitatibus sit tempora ullam, vel voluptatum! Corporis cumque in minus modi repellat totam velit."
				)
			),
			React.createElement(
				PurpleCard,
				{},
				React.createElement(CardImage, {
					src: "https://placehold.it/600x300/343536/abbccd",
					alt: "Placeholder image"
				})
			),
			React.createElement(
				WhiteCard,
				{},
				React.createElement(FitCardImage, {
					src: "https://placehold.it/1000x400/44139a/ddd",
					alt: "Placeholder image"
				}),
				React.createElement(
					CardHeadline,
					{},
					"Libero necessitatibus sit tempora!"
				),
				React.createElement(
					CardCopy,
					{},
					"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, consequatur corporis, culpa cum earum est libero necessitatibus sit tempora ullam, vel voluptatum! Corporis cumque in minus modi repellat totam velit."
				)
			),
			React.createElement(
				LayoutQuad,
				{"aria-labelledby": "quad"},
				React.createElement(
					WhiteCard,
					{},
					React.createElement(
						IconCardButton,
						{
							iconType: ICONS.like,
							isSpecial: true,
							isBlinking: this.state.selected,
							isSelected: !this.state.selected,
							onClick: this.handleClick,
							listeners: ["isSelected", "isBlinking", "isSpecial"]
						},
						"Like"
					),
					React.createElement(
						IconCardButton,
						{
							iconType: ICONS.dislike,
							isSelected: this.state.selected,
							isShaking: !this.state.selected,
							onClick: this.handleClick,
							listeners: ["isSelected", "isShaking"]
						},
						"Disike"
					)
				),
				React.createElement(
					SuccessCard,
					{},
					React.createElement(CardHeadline, {}, "You succeeded")
				),
				React.createElement(
					WarningCard,
					{},
					React.createElement(CardHeadline, {}, "Warning!")
				),
				React.createElement(
					YellowCard,
					{},
					React.createElement(
						CardCopy,
						{},
						"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, consequatur corporis, culpa cum earum est libero necessitatibus sit tempora ullam, vel voluptatum! Corporis cumque in minus modi repellat totam velit."
					)
				)
			)
		);
	}
}

module.exports = App;

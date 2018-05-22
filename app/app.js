const React = require("react");
const {
	Button,
	CardHeadline,
	CardCopy,
	CardImage,
	FitCardImage,
	IconCardButton,
	SmallCardImage,
	SuccessCard,
	WarningCard,
	BlueCard,
	YellowCard,
	PurpleCard,
	WhiteCard
} = require("./patterns/patterns");

const {LayoutQuad} = require("./patterns/layout");

const {ICONS} = require("./design-system");

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
					Button,
					{isSelected: true},
					"I am selected"
				),
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
							onClick: this.handleClick
						},
						"Like"
					),
					React.createElement(
						IconCardButton,
						{
							iconType: ICONS.dislike,
							isSelected: this.state.selected,
							isFoo: true,
							isFooBar: true,
							isShaking: !this.state.selected,
							onClick: this.handleClick
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

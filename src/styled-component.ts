import * as React from "react";
import * as cx from "classnames";
import {
	isTruthy,
	keepProps,
	removeProps,
	addNamespace,
	isHandler,
	isState,
	updateStyles,
	stateCase
} from "./utils";
import validify from "./get-valid-atrributes";
import {StyleStore} from "./store";

export declare type StyleInterpolation = (props: {}) => any;
export interface InitialProps {
	_namespace?: string | undefined;
	_name: string;
	_names: string[];
	_parent?: any;
	_children?: any;
	listeners?: string[];
}

export declare type CreateElement = (
	strings: string[],
	args: (string | StyleInterpolation)[],
	tagName: any,
	initialProps: InitialProps
) => any;

const scopedProps: string[] = [
	"className",
	"listeners",
	"children",
	"_children",
	"_parent",
	"_name",
	"_names",
	"_namespace"
];

const filterHandlers = (str: string): boolean => !isHandler(str);

class StyledComponent extends React.Component<InitialProps> {
	state: {_mounted?: boolean} = {
		...(this.props.listeners
			? this.props.listeners
					.map(x => ({[stateCase(x)]: this.props[x]}))
					.reduce((a, b) => ({...a, ...b}), {})
			: {})
	};

	initialProps: InitialProps = {_name: "", _names: []};
	tag: any = "";
	strings: string[] = [];
	args: (string | StyleInterpolation)[] = [];
	store: StyleStore = {
		addStyle(selector: string, style: string) {}
	};

	init() {
		const {_name, _names = [], _namespace, _parent} = this.initialProps;
		const [name] = _names;
		updateStyles(
			{name, _name},
			_namespace,
			_parent,
			_names,
			(selector: string) => {
				this.store.addStyle(selector, this.style);
			}
		);
		this.setState(
			{
				_mounted: true
			},
			() => {
				this.style;
				console.log(this.state);
			}
		);
	}
	UNSAFE_componentWillMount() {
		this.init();
	}

	componentDidMount() {
		this.init();
	}

	componentDidUpdate(oldProps) {
		if (this.listeners && this.listeners.length > 0) {
			this.listeners.forEach((listener: string) => {
				if (oldProps[listener] !== this.props[listener]) {
					this.style;
				}
			});
		}
	}

	/**
	 *
	 * @param {StyleInterpolation} arg
	 * @returns {string}
	 */
	handleArgFn(arg: StyleInterpolation): string {
		if (this.state._mounted) {
			const listeners = this.listeners
				.map(listener => ({
					[stateCase(listener)]: this.props[listener]
				}))
				.reduce((a: {}, b: {}): {} => ({...a, ...b}), {});
			this.setState({...listeners});
		}

		return "";
	}

	/**
	 *
	 * @param {{listeners: string[]}} props
	 * @returns {{}}
	 */
	private handleState(props: {listeners: string[]}): {} {
		return props.listeners.reduce((a: {}, b: {}): {} => ({...a, ...b}), {});
	}

	/**
	 *
	 * @returns {string}
	 */

	get style(): string {
		return this.strings
			.map((str: string, i: number) => {
				const arg: any = this.args[i];
				const injection: string =
					typeof arg === "function" ? this.handleArgFn(arg) : arg;
				return [str, injection].filter(Boolean);
			})
			.concat([
				this.listeners.length ? this.handleArgFn(this.handleState) : ""
			])
			.reduce((a, b) => a.concat(b), [])
			.filter(x => !isTruthy(x))
			.join("");
	}

	get listeners() {
		return Object.keys(this.mergedProps).filter(isState);
	}

	/**
	 *
	 * @returns {object}
	 */
	private get mergedProps(): object &
		InitialProps & {children: any; className: string} {
		return {
			...this.initialProps,
			...this.props,
			children: [
				...React.Children.toArray(
					typeof this.initialProps._children === "function"
						? this.initialProps._children(
								removeProps(
									this.props,
									scopedProps,
									filterHandlers
								)
						  )
						: this.initialProps._children
				),
				...React.Children.toArray(this.props.children)
			].filter(Boolean),
			className: this.props._name
		};
	}

	/**
	 *
	 * @returns {object}
	 */
	private get validProps(): object & {} {
		if (typeof this.tag === "string") {
			return keepProps(
				{
					...this.mergedProps,
					className: cx(
						addNamespace(
							this.initialProps._name,
							this.initialProps._namespace,
							this.initialProps._parent
						),
						...(this.mergedProps._names || []).map((name: string) =>
							addNamespace(
								name,
								this.initialProps._namespace,
								this.initialProps._parent
							)
						),
						{...this.state, _mounted: false}
					)
				},
				Object.keys(this.mergedProps).filter((str: string) =>
					validify(str, this.tag)
				)
			);
		}
		return this.mergedProps;
	}

	/**
	 *
	 * @returns {any}
	 */
	render() {
		//console.log(this.validProps);
		if (!this.tag) {
			return null;
		}
		return React.createElement(
			this.tag,
			this.validProps,
			...this.mergedProps.children
		);
	}
}

export default StyledComponent;

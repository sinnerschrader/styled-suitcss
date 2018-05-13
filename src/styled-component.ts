import * as React from "react";
import * as cx from "classnames";
import {
	isTruthy,
	keepProps,
	removeProps,
	addNamespace,
	isHandler,
	handleState,
	updateStyles,
	kebapCase
} from "./utils";
import validify from "./get-valid-atrributes";

import {StyleStore} from "./style-store.d";
import {InitialProps} from "./initial-props.d";
import {StyleInterpolation} from "./style-interpolation.d";

class StyledComponent extends React.Component<
	InitialProps & {listeners: string[]}
> {
	state: {_mounted?: boolean} = {
		...(this.props.listeners
			? this.props.listeners
					.map(x => ({[kebapCase(x)]: this.props[x]}))
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

	componentDidMount() {
		const {_name, _names = [], _namespace} = this.initialProps;
		const [name] = _names;
		updateStyles({name, _name}, _namespace, _names, (selector: string) => {
			this.store.addStyle(selector, this.style);
		});
		this.setState(
			{
				_mounted: true
			},
			() => {
				this.style;
			}
		);
	}

	componentDidUpdate(oldProps) {
		const {listeners} = this.props;
		if (listeners && listeners.length > 0) {
			listeners.forEach((listener: string) => {
				if (oldProps[listener] !== this.props[listener]) {
					this.style;
				}
			});
		}
	}

	handleArgFn(arg: StyleInterpolation): string {
		if (this.state._mounted) {
			this.setState(arg(this.props));
		}
		return "";
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
				return [str, injection];
			})
			.concat([
				this.props.listeners ? this.handleArgFn(handleState) : null
			])
			.reduce(
				(prev: string[], current: string[]) => prev.concat(current),
				[]
			)
			.filter(x => !isTruthy(x))
			.join("");
	}

	/**
	 *
	 * @returns {object}
	 */
	private get mergedProps(): object &
		InitialProps & {children: any; className: string; listeners: string[]} {
		return {
			...this.initialProps,
			...this.props,
			children: [
				...React.Children.toArray(
					typeof this.initialProps._children === "function"
						? this.initialProps._children(
								removeProps(
									this.props,
									[
										"className",
										"_name",
										"listeners",
										"children",
										"_children",
										"_names",
										"_namespace"
									],
									(str: string) => !isHandler(str)
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
							this.initialProps._namespace
						),
						...(this.mergedProps._names || []).map((name: string) =>
							addNamespace(name, this.initialProps._namespace)
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

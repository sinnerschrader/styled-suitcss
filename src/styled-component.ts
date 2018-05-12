import * as React from "react";
import {cx, isTruthy, keepProps, removeProps, addNamespace} from "./utils";
import validify from "./get-valid-atrributes";

import {StyleStore} from "./style-store.d";
import {InitialProps} from "./initial-props.d";
import {StyleInterpolation} from "./style-interpolation.d";

class StyledComponent extends React.Component<InitialProps> {
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
		if (_name) {
			if (
				_names.length < 2 &&
				!(name || _name).match(new RegExp(`^${_namespace}`))
			) {
				this.store.addStyle(
					addNamespace(_name, _namespace),
					this.style
				);
			} else {
				this.store.addStyle(_name, this.style);
			}
		} else {
			this.store.addStyle(name, this.style);
		}
	}

	/**
	 *
	 * @returns {string}
	 */
	get style(): string {
		return this.strings
			.map((str: string, i: number) => {
				const arg: string | StyleInterpolation | undefined = this.args[
					i
				];
				const injection: string =
					typeof arg === "function" ? arg(this.props) : arg;
				return [str, injection];
			})
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
		InitialProps & {children: any; className: string} {
		return {
			...this.initialProps,
			...this.props,
			// ensure correct className
			children: [
				...React.Children.toArray(
					typeof this.initialProps._children === "function"
						? this.initialProps._children(
								removeProps(this.props, [
									"className",
									"_name",
									"children",
									"_children",
									"_names",
									"_namespace"
								])
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
	private get validProps(): object {
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
						)
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

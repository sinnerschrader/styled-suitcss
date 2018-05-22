const camelCase = require("camelcase");
import {oneOf} from "./utils";
import {StyleInterpolation, InitialProps} from "./styled-component";
export declare type ExtensionCreator = (
	extension: string[],
	...args: string[]
) => void;

export declare type CreateComponent = (
	strings: string[],
	args: (string | StyleInterpolation)[],
	tag: any,
	initialProps: InitialProps
) => any;

export declare type ExtendComponent = (props: InitialProps) => ExtensionCreator;

const extendComponent = (
	_this: any,
	initialProps: InitialProps,
	create: CreateComponent
): ExtendComponent => (props: InitialProps) => {
	return (extension: string[] = [], ...args: string[]): ExtensionCreator => {
		const _name: string = `${initialProps._name}--${props._name}`;
		const _parent =
			typeof props._parent === "function"
				? props._parent.suitcssId
				: props._parent;
		const nextName = oneOf(
			{check: props._name, value: _name},
			{
				check: _parent,
				value: `${_parent}-${camelCase(initialProps._name)}`
			},
			{
				check: props._namespace,
				value: `${props._namespace}-${initialProps._name}`
			}
		);
		const mergedProps = {
			...initialProps,
			...props,
			_parent: "",
			_children: props._children,
			_name: nextName,
			_names: [...(initialProps._names || []), nextName]
		};
		return create(extension, args, _this, mergedProps);
	};
};

export default extendComponent;

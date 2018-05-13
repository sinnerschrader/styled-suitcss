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
		const _namespace: string = `${props._namespace}-${initialProps._name}`;
		const nextName = oneOf(
			{check: props._name, value: _name},
			{check: props._namespace, value: _namespace}
		);
		const mergedProps = {
			...initialProps,
			...props,
			_children: props._children,
			_name: nextName,
			_names: [...(initialProps._names || []), nextName]
		};
		return create(extension, args, _this, mergedProps);
	};
};

export default extendComponent;

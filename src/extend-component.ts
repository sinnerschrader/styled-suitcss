import {oneOf} from "./utils";

import {InitialProps} from "./initial-props.d";
import {ExtensionCreator} from "./extension-creator.d";
import {CreateComponent} from "./create-component.d";
import {ExtendComponent} from "./extend-component.d";

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

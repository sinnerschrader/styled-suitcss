import StyledComponent, {
	StyleInterpolation,
	InitialProps
} from "./styled-component";
import Store, {StyleStore} from "./store";
import extendComponent, {ExtendComponent} from "./extend-component";
import {addNamespace, updateStyles} from "./utils";

import keyframeCreator from "./keyframes";

export const store = new Store();

const create = (
	strings: string[] = [],
	args: (string | StyleInterpolation)[] = [],
	tag: any,
	initialProps: InitialProps
): any => {
	class Component extends StyledComponent {
		static extend: ExtendComponent = extendComponent(
			Component,
			initialProps,
			create
		);
		static suitcssId: string = addNamespace(
			initialProps._name,
			initialProps._namespace
		);
		initialProps: InitialProps = initialProps;
		strings: string[] = strings;
		args: (string | StyleInterpolation)[] = args;
		tag: any = tag;
		store: StyleStore = store;
	}

	return Component;
};

export const keyframes = (options: {_name: string; _namespace?: string}) =>
	keyframeCreator(store, options);

export default create;

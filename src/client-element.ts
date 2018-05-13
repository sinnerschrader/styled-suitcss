/* global document */
import StyledComponent from "./styled-component";
import Store from "./store";
import extendComponent from "./extend-component";

import {ExtendComponent} from "./extend-component.d";
import {InitialProps} from "./initial-props.d";
import {StyleInterpolation} from "./style-interpolation.d";
import {StyleStore} from "./style-store.d";
import keyframeCreator from "./keyframes";

export const store = new Store({document});

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

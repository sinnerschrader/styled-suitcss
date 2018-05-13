import StyledComponent, {InitialProps, StyleInterpolation} from "./styled-component";
import Store, {StyleStore} from "./store";
import extendComponent, {ExtendComponent} from "./extend-component";
import {updateStyles} from "./utils";

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

		initialProps: InitialProps = initialProps;
		strings: string[] = strings;
		args: (string | StyleInterpolation)[] = args;
		tag: any = tag;
		store: StyleStore = store;

		constructor(props: any) {
			super(props);
			const {_name, _names = [], _namespace} = initialProps;
			const [name] = _names;
			updateStyles(
				{name, _name},
				_namespace,
				_names,
				(selector: string) => {
					this.store.addStyle(selector, this.style);
				}
			);
		}
	}

	return Component;
};

export const keyframes = (options: {_name: string; _namespace?: string}) =>
	keyframeCreator(store, options);

export default create;

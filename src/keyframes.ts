import {addNamespace} from "./utils";
import {StyleInterpolation} from "./styled-component";
import {StyleStore} from "./store";

/**
 *
 * @param {StyleStore} store
 * @param {{_name: string, _namespace?: string}} options
 * @returns {(strings: string[], ...args: (string | StyleInterpolation)[]) => any}
 */
const keyframes: (
	store: StyleStore,
	options: {_name: string; _namespace?: string; _parent?: string}
) => (strings: string[], ...args: (string | StyleInterpolation)[]) => any = (
	store: StyleStore,
	options: {_name: string; _namespace?: string; _parent?: string}
) => (strings: string[], ...args: (string | StyleInterpolation)[]): string => {
	const style = strings
		.map((str: string, index: number): string => {
			return [str, args[index]].filter(Boolean).join("");
		})
		.join("");
	const name = addNamespace(
		options._name,
		options._namespace,
		options._parent
	);
	store.addKeyframes(name, style);
	return name;
};

export default keyframes;

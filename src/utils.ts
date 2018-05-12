import {StyleInterpolation} from "./style-interpolation";

/**
 *
 * @param input
 * @param {any[]} reject
 * @returns {boolean}
 */
export const isTruthy: (input: any, reject?: any[]) => boolean = (
	input: any,
	reject: any[] = [undefined, null, false]
): boolean => reject.includes(input);

/**
 *
 * @param {object} obj
 * @param {any[]} removals
 * @returns {object}
 */
export const keepProps: (obj: object, removals: any[]) => object = (
	obj: object,
	removals: any[]
): object =>
	Object.keys(obj)
		.filter((key: string): boolean => isTruthy(key, removals))
		.map((prop: string): object => ({[prop]: obj[prop]}))
		.reduce((a: object, b: object): object => ({...a, ...b}), {});

/**
 *
 * @param {object} obj
 * @param {any[]} removals
 * @param {(str: string) => (boolean | undefined)} filter
 * @returns {object}
 */
export const removeProps: (
	obj: object,
	removals: any[],
	filter?: (str: string) => boolean
) => object = (
	obj: object,
	removals: any[],
	filter: ((str: string) => boolean | undefined) = (str: string) => true
): object =>
	Object.keys(obj)
		.filter((key: string): boolean => !isTruthy(key, removals))
		.filter(filter)
		.map((prop: string): object => ({[prop]: obj[prop]}))
		.reduce((a: object, b: object): object => ({...a, ...b}), {});

/**
 *
 * @param {string} name
 * @param {string | undefined} namespace
 * @returns {string}
 */
export const addNamespace: (
	name: string,
	namespace: string | undefined
) => string = (name: string, namespace: string | undefined): string =>
	namespace ? `${namespace}-${name}` : name;

/**
 *
 * @param {{check: string | undefined, value: string}[]} items
 * @returns {string | null}
 */
export const oneOf: (
	...items: {check: string | undefined; value: string}[]
) => string | null = (
	...items: {check: string | undefined; value: string}[]
): string | null =>
	items
		.map(({check, value}) => (check === undefined ? null : value))
		.filter(Boolean)[0];

/**
 *
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
export const sortByNames: (a: string, b: string) => number = (
	a: string,
	b: string
): number => {
	const [aC] = a.split("{");
	const [bC] = b.split("{");
	const [aNames, aModifier] = aC.trim().split("--");
	const [bNames, bModifier] = bC.trim().split("--");
	const [, aName] = aNames.split("-");
	const [, bName] = bNames.split("-");
	if (aModifier) {
		if (bModifier) {
			if (aName) {
				if (bName) {
					return 0;
				}
				return 1;
			}
			return bName ? -1 : 0;
		}
		return 1;
	}
	if (aName) {
		if (bName) {
			return 0;
		}
		return 1;
	}
	return bName ? -1 : 0;
};

/**
 *
 * @param {string} str
 * @returns {boolean}
 */
export const isHandler: (str: string) => boolean = (str: string): boolean => {
	const [o, n, E] = str.split("");
	return o + n === "on" && isUpperCase(E);
};

/**
 *
 * @param {string} str
 * @returns {boolean}
 */
export const isUpperCase: (str: string | undefined) => boolean = (
	str: string
): boolean => (str ? str === str.toUpperCase() : false);

/**
 *
 * @param {string} str
 * @returns {boolean}
 */
export const dataOrAria: (str: string) => boolean = (str: string): boolean =>
	str === "data-" || str === "aria-";

/**
 *
 * @param {{listeners: string[]}} props
 * @returns {{}}
 */
export const handleState: StyleInterpolation = (props: {
	listeners: string[];
}): {} =>
	props.listeners
		.map((prop: string): {} => ({
			[kebapCase(prop)]: props[prop]
		}))
		.reduce((a: {}, b: {}): {} => ({...a, ...b}), {});

/**
 *
 * @param {{name: string; _name: string}} data
 * @param {string} _namespace
 * @param {string[]} _names
 * @returns {boolean}
 */
export const needsNamespace: (
	data: {name: string; _name: string},
	_namespace: string,
	_names: string[]
) => boolean = (
	data: {name: string; _name: string},
	_namespace: string,
	_names: string[]
): boolean => {
	if (_names.length < 2) {
		const {name, _name} = data;
		const comparison = name || _name;
		const pattern = new RegExp(`^${_namespace}`);
		return !comparison.match(pattern);
	}
	return false;
};

/**
 *
 * @param {{name: string, _name: string}} data
 * @param {string} _namespace
 * @param {string[]} _names
 * @returns {number}
 */
export const styleInjection: (
	data: {name: string; _name: string},
	_namespace: string,
	_names: string[]
) => number = (
	data: {name: string; _name: string},
	_namespace: string,
	_names: string[]
): number => {
	const {_name, name} = data;
	if (_name) {
		if (needsNamespace({name, _name}, _namespace, _names)) {
			return 0;
		} else {
			return 1;
		}
	} else {
		return 2;
	}
};

/**
 *
 * @param {{name: string, _name: string}} data
 * @param {string} _namespace
 * @param {string[]} _names
 * @param {(selector: string) => void} addStyle
 */
export const updateStyles: (
	data: {name: string; _name: string},
	_namespace: string,
	_names: string[],
	addStyle: (selector: string) => void
) => void = (
	data: {name: string; _name: string},
	_namespace: string,
	_names: string[],
	addStyle: (selector: string) => void
) => {
	const {name, _name} = data;
	switch (styleInjection({name, _name}, _namespace, _names)) {
		case 0:
			addStyle(addNamespace(_name, _namespace));
			break;
		case 1:
			addStyle(_name);
			break;
		default:
			addStyle(name);
			break;
	}
};

/**
 *
 * @param {string} str
 * @returns {string}
 */
export const kebapCase: (str: string) => string = (str: string): string =>
	str
		.split("")
		.map(
			(char: string) =>
				isUpperCase(char) ? `-${char.toLowerCase()}` : char
		)
		.join("");

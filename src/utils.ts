const camelCase = require("camelcase");
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
 * @param {string | undefined} parent
 * @returns {string}
 */
export const addNamespace: (
	name: string,
	namespace?: string | undefined,
	parent?: string | undefined
) => string = (
	name: string,
	namespace: string | undefined,
	parent: string | undefined
): string => {
	if (namespace) {
		return `${namespace}-${name}`;
	}
	if (parent) {
		return `${parent}-${camelCase(name)}`;
	}
	return name;
};

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

const h = {
	namespace: "^[a-z]([a-z0-9]+)?-",
	ComponentName: "([A-Z]([a-zA-Z]+)?)",
	descendentName: "([a-z]([a-zA-Z]+)?)",
	modifierName: "([a-z]([a-zA-Z0-9]+)?)"
};

export const patterns = [
	new RegExp(`${h.ComponentName}-${h.descendentName}--${h.modifierName}`),
	new RegExp(`${h.ComponentName}-${h.descendentName}`),
	new RegExp(`${h.ComponentName}--${h.modifierName}`),
	new RegExp(h.ComponentName)
];

export const getOrderFromPattern = (
	name: string,
	patterns: RegExp[]
): number => {
	let counter: number = 0;
	let match: string[] | null = null;
	const length: number = patterns.length;
	while (!match && counter < length) {
		match = name.match(patterns[counter]);
		++counter;
	}
	return length - counter;
};

/**
 *
 * @param {string} str
 * @returns {string}
 */
export const cleanName: (str: string) => string = (str: string): string =>
	str
		.split("{")[0]
		.trim()
		.replace(new RegExp(h.namespace), "");

/**
 *
 * Patterns:
 * Xxx
 * Xxx-Xxx
 * Xxx--xxx
 * Xxx-Xxx--xxx
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
export const sortByNames: (a: string, b: string) => number = (
	a: string,
	b: string
): number => {
	return (
		getOrderFromPattern(cleanName(a), patterns) -
		getOrderFromPattern(cleanName(b), patterns)
	);
};

/**
 *
 * @param {string} str
 * @returns {boolean}
 */
export const isHandler: (str: string) => boolean = (str: string): boolean => {
	const [o, n, event] = str.split("");
	return o + n === "on" && isUpperCase(event);
};

/**
 *
 * @param {string} str
 * @returns {boolean}
 */
export const isState: (str: string) => boolean = (str: string): boolean => {
	const [i, s, state] = str.split("");
	return i + s === "is" && isUpperCase(state);
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
	_parent: string,
	_names: string[],
	addStyle: (selector: string) => void
) => void = (
	data: {name: string; _name: string},
	_namespace: string,
	_parent: string,
	_names: string[],
	addStyle: (selector: string) => void
) => {
	const {name, _name} = data;
	switch (styleInjection({name, _name}, _namespace, _names)) {
		case 0:
			addStyle(addNamespace(_name, _namespace, _parent));
			break;
		case 1:
			addStyle(_name);
			break;
		case 2:
			addStyle(name);
			break;
	}
};

/**
 *
 * @param {string} str
 * @returns {string}
 */
export const stateCase: (str: string) => string = (str: string): string =>
	str.replace(/^is([A-Z])/, (original: string, $1: string): string => {
		return `is-${$1.toLowerCase()}`;
	});

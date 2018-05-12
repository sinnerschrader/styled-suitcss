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
 * @returns {object}
 */
export const removeProps: (obj: object, removals: any[]) => object = (
	obj: object,
	removals: any[]
): object =>
	Object.keys(obj)
		.filter((key: string): boolean => !isTruthy(key, removals))
		.map((prop: string): object => ({[prop]: obj[prop]}))
		.reduce((a: object, b: object): object => ({...a, ...b}), {});

/**
 *
 * @param {string} arr
 * @returns {string}
 */
export const cx: (...arr: string[]) => string = (...arr: string[]): string =>
	arr.filter(Boolean).join(" ");

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
export const sortbyNames: (a: string, b: string) => number = (
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

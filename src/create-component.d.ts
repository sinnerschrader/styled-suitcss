import {InitialProps} from "./initial-props";
import {StyleInterpolation} from "./style-interpolation";

export declare type CreateComponent = (
	strings: string[],
	args: (string | StyleInterpolation)[],
	tag: any,
	initialProps: InitialProps
) => any;

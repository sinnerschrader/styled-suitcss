import {StyleInterpolation} from "./style-interpolation.d";
import {InitialProps} from "./initial-props.d";

export declare type CreateElement = (
	strings: string[],
	args: (string | StyleInterpolation)[],
	tagName: any,
	initialProps: InitialProps
) => any;

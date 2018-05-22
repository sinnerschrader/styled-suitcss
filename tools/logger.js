const winston = require("winston");

/**
 * Creates spaces to pad strings
 * @param str
 * @param maxLength
 * @returns {string}
 */
const createSpaces = (str, maxLength = 10) =>
	Array(Math.max(0, maxLength - str.length))
		.map(() => " ")
		.join(" ");

/**
 * Pads a string on the right
 * @param str
 * @param n
 * @returns {string}
 */
const rightPad = (str, n) => `${str}${createSpaces(str, n)}`;

/**
 * Pads a string on the left
 * @param str
 * @param n
 * @returns {string}
 */
const leftPad = (str, n) => `${createSpaces(str, n)}${str}`;

/**
 * Creates a logger to report info of the script
 * @type {*|DerivedLogger}
 */
const logger = winston.createLogger({
	level: process.env.LOG_LEVEL,
	format: winston.format.combine(
		winston.format.json(),
		winston.format.colorize(),
		winston.format.simple(),
		winston.format.printf(
			({level, message}) => `${rightPad(level, 20)}${message}`
		)
	),
	transports: [new winston.transports.Console()]
});

module.exports = {
	logger,
	createSpaces,
	rightPad,
	leftPad,
	default: logger
};

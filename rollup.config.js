import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

export default [
	{
		input: "bundle.config.js",
		output: [
			{
	      name: "rung",
				file: pkg.main,
				format: "cjs"
			},
			{
				name: "rung",
				file: "rung.min.js",
				format: "iife",
				plugins: [terser()]
			}
		],
		plugins: [json()]
	}
];

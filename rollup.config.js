import pkg from './package.json';

export default [
	{
		input: 'src/rung.js',
		output: {
      name: 'rung',
			file: pkg.browser,
			format: 'iife'
		}
	},
	{
		input: 'src/rung.js',
		output: [
			{ file: pkg.main, format: 'cjs' }
		]
	},
	{
		input: 'src/algorithms.js',
		output: [
			{ file: "algorithms.js", format: 'cjs' }
		]
	}
];

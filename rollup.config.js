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
		input: 'src/algorithms/alea.js',
		output: [
			{ file: "lib/alea.js", format: 'cjs' }
		]
	},
	{
		input: 'src/algorithms/mersenne-twister.js',
		output: [
			{ file: "lib/mersenne-twister.js", format: 'cjs' }
		]
	},
	{
		input: 'src/algorithms/xorshift.js',
		output: [
			{ file: "lib/xorshift.js", format: 'cjs' }
		]
	}
];

// eslint-disable-next-line no-undef
module.exports = {
	env: { browser: true, es2020: true },
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react-hooks/recommended",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: { ecmaVersion: "latest", sourceType: "module" },
	plugins: ["react-refresh", "simple-import-sort"],
	rules: {
		"react-refresh/only-export-components": "warn",
		"simple-import-sort/imports": "error",
		"simple-import-sort/exports": "error",
		"semi": ["error", "always"],
		"quotes": ["error", "double"],
		"indent": ["error", "tab"],
		"no-invalid-this": "error",
		"no-else-return": ["warn", {allowElseIf: true}],
		"no-lonely-if": "warn",
		"no-magic-numbers": "warn",
	},
};

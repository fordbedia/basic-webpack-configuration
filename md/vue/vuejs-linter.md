## Vuejs ESLinter

First we need to install these required packages for eslint.

- babel-eslint
- eslint
- eslint-config-airbnb-base
- eslint-config-standard
- eslint-friendly-formatter
- eslint-loader
- eslint-plugin-html
- eslint-plugin-import
- eslint-plugin-node
- eslint-plugin-promise
- eslint-plugin-standard
- eslint-plugin-vue

NPM
```
npm install --save-dev babel-eslint eslint eslint-config-airbnb-base eslint-config-standard eslint-friendly-formatter eslint-loader eslint-plugin-html eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard eslint-plugin-vue

```

Yarn
```
yarn add babel-eslint eslint eslint-config-airbnb-base eslint-config-standard eslint-friendly-formatter eslint-loader eslint-plugin-html eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard eslint-plugin-vue -D
```

Now we need to create `.eslintrc.js` file for our linter configuration.

```javascript
module.exports = {
    root: true,
    parserOptions: {
        parser: "babel-eslint",
        sourceType: "module"
    },
    env: {
        browser: true
    },
    plugins: ["html"],
    extends: ['standard', 'plugin:vue/essential'],
    rules: {
        "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
        indent: "off",
        "no-tabs": 0,
        'no-unused-vars': 'off',
        'no-useless-return': 'off',
        'no-inner-declarations': 'off',
        'no-undef': 'warn',
        'no-floating-decimal': 'off',
        'no-redeclare': 'warn',
        'no-unneeded-ternary': 'off',
        'no-undef': 'off',
        'vue/no-use-v-if-with-v-for': 'off'
    }
}
```

Now back to your webpack `webpack.config.js` insert the `eslint-loader` in the rules json object.

It will read something like this:

```javascript
module: {
	rules: [{
		enforce: 'pre',
		test: /\.(js|vue)$/,
		exclude: /node_modules/,
		loader: 'eslint-loader'
	}]
}
```

Or in your Laravel `webpack.mix.js` add the following:

```javascript
mix.webpackConfig({
	module: {
		rules: [{
			enforce: 'pre',
			test: /\.(js|vue)$/,
			exclude: /node_modules/,
			loader: 'eslint-loader',
			// options: {
			// 	formatter: require('eslint-friendly-formatter')
			// }
		}]
  },
  output: {
    chunkFilename: 'js/bundlers/[name].bundle.js',
    publicPath: '/',
  }
});
```

Now run compile to check some errors.

```
npm run dev
```
# Solve the “You are using the runtime-only build of Vue” error

[Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.

Copy this code below on your `webpack.config.js`

```javascript
resolve: {
    alias: {
        'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
},
module: {
    ...
}
```
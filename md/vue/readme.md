Let's assume you have configured the [Setup and Installation](https://github.com/fordbedia/basic-webpack-configuration#setup-and-installation) and [Basic Wepback Configuration](https://github.com/fordbedia/basic-webpack-configuration#basic-webpack-configuration) as explained from

Let's install `-D vue-loader` and `vue-template-compiler`

```
npm install -D vue vue-loader vue-template-compiler vue-router
```

Now let's edit our webpack configuration `webpack.config.js` and amend the vue loader.

_Note: make sure to include the vue loader plugin plugin_

```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: 'bundlers/[id].css'
    }),
    new VueLoaderPlugin() // Vue Loader Plugin
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin(), new OptimizeCSSAssetsPlugin({})]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
}
```

In our [Setup and Installation](/README.md) we have set a `src` directory and inside we have `assets`, `components`, `index.js` and `App.js` but since we are in vue we can simply change `App.js` to `App.vue`

We can now add vue files that will serve as our routes components

```
./src/components/Home.vue
./src/components/About.vue
./src/components/Users.vue
```

`./src/components/Home.vue`

```html
<template>
  <div>My First App</div>
</template>
```

`./src/components/About.vue`

```html
<template>
  <div>About</div>
</template>
```

`./src/components/Users.vue`

```html
<template>
  <div>Users</div>
</template>
```

Now let's edit `./src/index.js`

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Home from './components/Home.vue'
import About from './components/About.vue'
import Users from './components/Users.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/Users',
      component: Users
    }
  ]
})

new Vue({
  render: h => h(App),
  router,
  components: { App }
}).$mount('#app')
```

Edit `./src/App.vue`

```html
<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {}
</script>
```

Finally we run the compiler:

```javascript
npm run dev

or

yarn dev

```

to watch

```javascript
npm run watch

or

yarn watch
```

to compile for production

```javascript
npm run build

or

yarn build
```

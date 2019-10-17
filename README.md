# Basic Wepback Configuration Guide

### Setup and Installation:

Assuming you’re in your ~/document_root/my_project directory:

`npm init -y`
This will create a `package.json` file with the default attributes.

Next up, install webpack and webpack cli:
`npm i webpack webpack-cli --save-dev`

Now let's open `package.json` and configure the scripts. This will be the commands to tell webpack to compile our scripts.

Let's create `src` directory and inside, create a file called `index.js`

```json
  "dev": "webpack --mode development ./src/index.js --output ./build/main.js",
  "build": "webpack --mode production ./src/index.js --output ./build/main.js",
  "watch": "webpack --watch --mode development ./src/index.js --output ./build/main.js"
```

Next, we're gonna need `babel`. `babel` is a JavaScript compiler that helps us transform our codes to es5. For more information about babel, please refer to [https://babeljs.io/docs/en/](https://babeljs.io/docs/en/).

Now let's install babel:

```
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react babel-plugin-transform-class-properties --save-dev
```

_babel-plugin-transform-class-properties is necessary for using ES6 class static properties_

Pull in `react`, `react-router-dom` and `prop-types`. `prop-types` is optional, you may want to use it in your app.

```
npm i react react-dom prop-types react-router-dom --save-dev
```

Configure Babel by creating a new file named `.babelrc` inside the project folder:

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": ["transform-class-properties"]
}
```

And finally create a new file named `webpack.config.js` for configuring babel-loader:

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
```

Now we’re ready to add loaders for sass, css, style.

To install `sass-loader` `css-loader` it is important to install `node-sass` as package dependency for `sass-loader`. To learn more, please refer to [https://webpack.js.org/loaders/sass-loader](https://webpack.js.org/loaders/sass-loader/#root).

Now let's install it.

`npm install sass-loader node-sass css-loader --save-dev`

Back in your `webpack.config.js`, edit the configuration:

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(c|sc)ss$/i,
        use: ['css-loader', 'sass-loader']
      }
    ]
  }
}
```

We'll be needing this packages for advance setup.

- `mini-css-extract-plugin` to extract css into a separate files.
- `uglifyjs-webpack-plugin` to minify JavaScript.
- `optimize-css-assets-webpack-plugin` to minify css

Let's install it:

```
npm install mini-css-extract-plugin uglifyjs-webpack-plugin optimize-css-assets-webpack-plugin --save-dev
```

### [Basic Webpack Configuration:](#basic)

```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: 'bundlers/[id].css'
    })
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin(), new OptimizeCSSAssetsPlugin({})]
  },
  module: {
    rules: [
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

Back in your `index.js`, let's add scss file `./src/assets/scss/index.scss`

```scss
h1 {
  font-size: 50px;
  color: #333;
}
```

and import it to our entry point `./src/index.js`.

```javascript
import Style from './assets/scss/index.scss'
```

Ok we're now set on our basic config for css/sass. Let's try running it:

```
npm run dev
```

As you can see the `main.css` file has been created for us on `build` directory.

Let's try the production:

```
npm run build
```

Now if you check again the file `./build/main.css` it's minified.

### Time to REACT

Back in our `src` directory. Let's add a mother component called `./src/App.js`. Inside the `App.js`:

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  HashRouter,
  Route,
  Link
} from 'react-router-dom'

import Home from './components/Home.jsx'
import About from './components/About.jsx'
import Users from './components/Users.jsx'

const App = () => {
  return (
    <Router>
      <HashRouter>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
            </ul>
          </nav>

          <Route exact path="/about" component={About}></Route>
          <Route exact path="/users" component={Users}></Route>
          <Route exact path="/" component={Home}></Route>
        </div>
      </HashRouter>
    </Router>
  )
}

if (document.getElementById('app')) {
  ReactDOM.render(<App />, document.getElementById('app'))
}
```

Let's create another directory called `components`. We'll be using that direcory for our JSX files.

```
./src/components/Home.jsx
./src/components/About.jsx
./src/components/User.jsx
```

`Home.jsx`

```javascript
import React from 'react'
export default () => {
  return <h2>Home</h2>
}
```

`About.jsx`

```javascript
import React from 'react'
export default () => {
  return <h2>About</h2>
}
```

`User.jsx`

```javascript
import React from 'react'
export default () => {
  return <h2>Users</h2>
}
```

<pre>
-- src
  -- components
    - Home.jsx
    - About.jsx
    - Users.jsx
- App.js
</pre>

Next import the enrty point for webpack ./src/index.js:

```javascript
import App from './App.js'
```

Lastly create the template `index.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="build/main.css" />
    <title>Basic Webpack Configuration Guide</title>
  </head>

  <body>
    <section class="section">
      <div class="container">
        <div id="app" class="columns"><!-- React --></div>
      </div>
    </section>
  </body>

  <script src="build/main.js"></script>
</html>
```

Now let's try compiling our script:

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

For Lazy Loading setup, please see this [link](/md/react/code-splitting.md)

[Vuejs Configuration](md/vue/readme.md)

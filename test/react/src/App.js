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

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
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

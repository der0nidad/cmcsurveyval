import React from 'react';
import {
  BrowserRouter as Router, Link, Route, Switch,
} from 'react-router-dom';
import Auth from '../Auth';
import SignUp from '../SignUp';
import { LeadList } from '../LeadList';

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">SignUp</Link>
            </li>
            <li>
              <Link to="/lead">Protected Leads2</Link>
              {' '}
              по идее мы не должны напрямую обращаться к джанго-вьюхам
            </li>
            <li>
              <Link to="/someurl">SomeUrl</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login/">
            <Auth />
          </Route>
          <Route path="/signup/">
            <SignUp />
          </Route>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/lead">
            <SignUp />
          </Route>
          <Route path="/someurl">
            <LeadList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

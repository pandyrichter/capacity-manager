import React from "react";
import { 
  Route, 
  Redirect,
  Switch,
  BrowserRouter as Router } from "react-router-dom";

import NavBar from "./NavBar";
import Dashboard from "./Dashboard";
import Settings from "./Settings";

class App extends React.Component {
  constructor() {
    super();

  }

  render() {
    return (
      <Router>
        <div className="container">
          <NavBar />
          <Switch>
            <Route path="/settings" component={Settings} />
            <Route path="/:teamName" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    );
  }
}

module.exports = App;

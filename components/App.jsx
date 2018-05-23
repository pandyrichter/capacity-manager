import React from "react";
import { 
  Route, 
  Redirect,
  Switch,
  BrowserRouter as Router } from "react-router-dom";

import NavBar from "./NavBar";
import FilterBar from "./FilterBar";
import DataContainer from "./DataContainer";
import Dashboard from "./Dashboard";
import Settings from "./Settings";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchTerm: "",
      filterParam: "Outstanding"
    };

    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
    this.handleFilterParamChange = this.handleFilterParamChange.bind(this);
  }

  handleSearchTermChange(t) {
    this.setState({ searchTerm: t });
  }

  handleFilterParamChange(f) {
    this.setState({ filterParam: f });
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

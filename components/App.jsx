import React from "react";
import FilterBar from "./FilterBar";
import DataContainer from "./DataContainer";

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
      <div className="container">
        <div className="nav">
          <h1>Capacity Manager</h1>
          <ul>
            <li>Notifications</li>
          </ul>
        </div>
        <FilterBar
          searchTerm={this.state.searchTerm}
          filterParam={this.state.filterParam}
          onSearchTermChange={this.handleSearchTermChange}
          onFilterChange={this.handleFilterParamChange}
        />
        <DataContainer
          searchTerm={this.state.searchTerm}
          filterParam={this.state.filterParam}
        />
      </div>
    );
  }
}

module.exports = App;

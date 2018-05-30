import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import queryString from "query-string";

class FilterBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeFilter: ''
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSearchChange(event) {
    this.props.onSearchTermChange(event.target.value);
  }

  clearSearch() {
    this.props.onSearchTermChange("");
  }

  handleFilterChange(event) {
    const { filter } = queryString.parse(this.props.location.search)
    if (filter === event.target.value) {
      this.props.history.push({
        pathname: this.props.match.url,
        search: ``
      });
    } else {
      this.props.history.push({
        pathname: this.props.match.url,
        search: `?filter=${event.target.value}`
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const { filter } = this.props.match;

    const filterTypes = ["Outstanding", "Won", "Lost", "Open", "In Closing", "Closed"];

    const searchTerm = this.props.searchTerm;

    const activeStyle = {
      backgroundColor: "lightblue"
    };

    const inactiveStyle = {
      backgroundColor: "transparent",
      color: "black"
    };

    return (
      <div className="filter-bar">
        <div className="filter-button-wrapper">
          <h2>Filter:</h2>
          {filterTypes.map(f => {
            return (
              <button
              key={f}
              onClick={this.handleFilterChange}
              value={f}
              className="filter-button"
              style={f === filter ? activeStyle : inactiveStyle }
              >{f}
              </button>
            );
          })}
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={searchTerm}
            onChange={this.handleSearchChange}
            placeholder="Search..."
          />
          {searchTerm ? (
            <button className="filter-button" onClick={this.clearSearch}>
              Clear Search
            </button>
          ) : (
            ""
          )}
        </form>
      </div>
    );
  }
}

FilterBar.propTypes = {
  searchTerm: PropTypes.string,
  activeFilter: PropTypes.string
};

module.exports = FilterBar;

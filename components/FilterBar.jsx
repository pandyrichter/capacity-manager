import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class FilterBar extends React.Component {
  constructor(props) {
    super(props);

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

  // TODO: This can be removed before pull request
  handleFilterChange(event) {
    const self = this;
    if (event.target.value === this.props.filterParam) {
      this.props.onFilterChange("");
    } else {
      this.props.onFilterChange(event.target.value);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const { match } = this.props;

    const filterTypes = ["Outstanding", "Won", "Lost", "Open", "In Closing", "Closed"];
    const searchTerm = this.props.searchTerm;

    const activeStyle = {
      backgroundColor: "lightblue"
    };

    const inactiveStyle = {
      backgroundColor: "transparent"
    };

    return (
      <div className="filter-bar">
        <div className="filter-button-wrapper">
          <h2>Filter:</h2>
          {filterTypes.map(filter => {
            return (
              <Link 
                key={filter} 
                to={{
                  pathname: match.path.url,
                  search: `?filter=${filter}`
                }}>{filter}</Link>
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
};

module.exports = FilterBar;

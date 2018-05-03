import React from 'react';
import PropTypes from 'prop-types';

class FilterBar extends React.Component {
  constructor (props) {
    super(props);

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSearchChange(event) {
    this.props.onSearchTermChange(event.target.value);
  };

  clearSearch() {
    this.props.onSearchTermChange('');
  }

  handleFilterChange(event) {
    if (event.target.value === this.props.filterParam) {
      this.props.onFilterChange('');
    } else {
      this.props.onFilterChange(event.target.value);
    }
  };

  handleSubmit(event) {
    event.preventDefault();
  };

  render () {
    const filterTypes = ["Assigned", "Unassigned", "Outstanding", "Closed"];
    const searchTerm = this.props.searchTerm;
    const filterParam = this.props.filterParam;

    const activeStyle = {
      backgroundColor: 'lightblue'
    };

    const inactiveStyle = {
      backgroundColor: 'transparent'
    }

    return (
    <div className="filter-bar">
    <div className="filter-button-wrapper">
      <h2>Filter:</h2>
        {filterTypes.map(filter => {
          return (<button
          key={filter}
          onClick={this.handleFilterChange}
          value={filter}
          className="filter-button"
          style={filterParam === filter ? activeStyle : inactiveStyle }
          >{filter}</button>)
        })}
    </div>
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={searchTerm} onChange={this.handleSearchChange} placeholder="Search..."/>
        {searchTerm
        ? <button className="filter-button" onClick={this.clearSearch}>Clear Search</button>
        : ''}
      </form>
    </div>
    )
  };
};

FilterBar.propTypes = {
  searchTerm: PropTypes.string,
  filterParam: PropTypes.string
}

module.exports = FilterBar;
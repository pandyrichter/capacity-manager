import React from 'react';

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
    const searchTerm = this.props.searchTerm;
    const filterParam = this.props.filterParam;

    return (
    <div className="filter-bar">
      <h2>Filter:</h2>
      <ul>
        <button onClick={this.handleFilterChange} value="Assigned">Assigned</button>
        <button onClick={this.handleFilterChange} value="Unassigned">Unassigned</button>
        <button onClick={this.handleFilterChange} value="Outstanding">Outstanding</button>
        <button onClick={this.handleFilterChange} value="Closed">Closed</button>
      </ul>
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={searchTerm} onChange={this.handleSearchChange} placeholder="Search..."/>
        <button onClick={this.clearSearch}>Clear Search</button>
      </form>
    </div>
    )
  };
};

module.exports = FilterBar;
import React from 'react';

const FilterBar = () => {
  return (
    <div className="filter-bar">
      <h2>Filter</h2>
      <ul>
        <li>Assigned</li>
        <li>Unassigned</li>
      </ul>
      <input type="text"  placeholder="Search for PM"/>
    </div>
  )
}

module.exports = FilterBar;
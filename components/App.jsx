import React from 'react';
import FilterBar from './FilterBar';
import DataContainer from './DataContainer';

const App = () => {
  return (
    <div className="container">
      <div className="nav">
        <h1>Capacity Manager</h1>
        <ul>
          <li>Notifications</li>
        </ul>
      </div>
      <FilterBar />
      <DataContainer />
    </div>
  )
}

module.exports = App;
import React from 'react';
import FilterBar from './FilterBar';
import GraphsContainer from './GraphsContainer';

const App = () => {
  return (
    <div className="container">
      <h1>Capacity Manager</h1>
      <FilterBar />
      <GraphsContainer />
    </div>
  )
}

module.exports = App;
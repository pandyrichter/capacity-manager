import React from "react";
import PropTypes from "prop-types";

import ProjectPhases from "./ProjectPhases";

const ProjectTimeframe = (props) => {
  
  const highStress = {
    backgroundColor: 'orange'
  };

  const lowStress = {
    backgroundColor: 'blue'
  };

  return (
    <div
      className="project__timeframe"
      style={props.capacityScore === 1 
        ? highStress
        : lowStress
      }>
      <ProjectPhases />
    </div>
  )
};

ProjectTimeframe.propTypes = {
  capacityScore: PropTypes.number.isRequired
}

module.exports = ProjectTimeframe;
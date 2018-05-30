import React from "react";

const ProjectPhases = (props) => {
  const dummyPhases = ["Phase 1", "Phase 2", "Phase 3"];

  const inlineStyle = {
    display: 'inline-block'
  }

  return (
    <div>
      {dummyPhases.map((p, id) => <div key={id} style={inlineStyle}>{p}</div>)}
    </div>
  )
}

module.exports = ProjectPhases;
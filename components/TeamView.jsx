import React from "react";

const TeamView = (props) => {
  const { teamName } = props.match.params;

  return (
    <div>
      <h2>{teamName}</h2>
    </div>
  )
}

module.exports = TeamView;

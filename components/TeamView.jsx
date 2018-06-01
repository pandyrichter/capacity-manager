import React from "react";

import { Typography } from "material-ui";

import queryString from "query-string";

const TeamView = (props) => {
  const { teamName } = props.match.params;
  const { pm } = queryString.parse(location.search);

  return (
    <div>
      <Typography variant="display1">{teamName}<span>{pm ? ` > ${pm}` : ""}</span></Typography>
    </div>
  )
}

module.exports = TeamView;

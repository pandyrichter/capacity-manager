import React from "react";
import { Link } from "react-router-dom";

import { 
  Chip,
  Avatar,
  Typography,
  withStyles
  } from "material-ui";

import queryString from "query-string";

const styles = {
  resourceChip: {
    marginRight: 8,
    minWidth: 120
  }
};

const ResourceContainer = (props) => {
  const { 
    resourceType,
    resources,
    location, 
    match, 
    history,
    classes 
  } = props;

  // temporary for filtering by Project Manager Only
  const handlePmChange = (event) => {
    const { pm } = queryString.parse(location.search)
    if (pm === event.target.value) {
      history.push({
        pathname: match.url,
        search: ``
      });
    } else {
      console.log(event.target.value);
      history.push({
        pathname: match.url,
        search: `?pm=${event.target.value}`
      });
    }
  }

  return (
    <div className={classes.resources}>
      <Typography variant="title" gutterBottom={true}>{resourceType}</Typography>
      <div className="flex">
        {resources.map((r, id) => <Chip 
          key={id}
          onClick={handlePmChange} 
          className={classes.resourceChip}
          label={r.fields["Name"]} 
          value={r.fields["Name"]}>
          {r.fields["Name"]}
          </Chip>
        )}
      </div>
    </div>
  )
};

export default withStyles(styles)(ResourceContainer);
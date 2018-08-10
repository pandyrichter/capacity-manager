import React from "react";

import {
  TextField,
  withStyles
} from "material-ui";

const styles = {
  searchBar: {
    marginBottom: 25,
    marginTop: 25
  }
};

const SearchBar = (props) => {
  const { classes } = props;

  function handleSearchChange(event) {
    props.onSearchTermChange(event.target.value);
  }
  
  function clearSearch() {
    props.onSearchTermChange("");
  }

  return (
    <div className={classes.searchBar}>
      <TextField 
        id="project-search"
        label="Search Projects"
        placeholder="Project"
        fullWidth
        onChange={handleSearchChange}
      />
    </div>
  )
}

export default withStyles(styles)(SearchBar);
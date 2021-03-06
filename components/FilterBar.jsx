import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { 
  Chip,
  Typography,
  withStyles 
} from "material-ui";

import queryString from "query-string";

const styles = {
  filterBar: {
    marginBottom: 25
  },

};

class FilterBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleFilterChange(event) {
    const { filter } = queryString.parse(this.props.location.search)
    if (filter === event.target.value) {
      this.props.history.push({
        pathname: this.props.match.url,
        search: ``
      });
    } else {
      this.props.history.push({
        pathname: this.props.match.url,
        search: `?filter=${event.target.value}`
      });
    }
  }

  render() {
    const { filter } = this.props.match;
    
    const filterTypes = ["Outstanding", "Won", "Lost", "Open", "In Closing", "Closed"];
        
    const { classes } = this.props;

    const activeStyle = {
      backgroundColor: "lightblue"
    };

    const inactiveStyle = {
      backgroundColor: "transparent",
      color: "black"
    };

    return (
      <div className={classes.filterBar}>
          <Typography variant="title">Filter</Typography>
          <div className="filter-button-wrapper">
            {filterTypes.map(f => {
              return (
                <Chip
                key={f}
                onClick={this.handleFilterChange}
                value={f}
                label={f}
                className={classes.filterChip}
                // style={f === filter ? activeStyle : inactiveStyle }
                >{f}
                </Chip>
              );
            })}
          </div>
      </div>
    );
  }
}

FilterBar.propTypes = {
  activeFilter: PropTypes.string
};

module.exports = withStyles(styles)(FilterBar);

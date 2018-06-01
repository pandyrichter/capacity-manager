import React from "react";
import { Link } from "react-router-dom";

import { 
  AppBar,
  Toolbar,
  Button,
  Typography,
  withStyles
} from "material-ui";

const styles = {
  nav: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  }
}

const NavBar = (props) => {
  const { classes } = props;

  return (
    <div className={classes.nav}>
      <AppBar position="sticky" color="default">
        <Toolbar>
          <Typography variant="display1" className={classes.flex}>Capacity Manager</Typography>
          <div>
            <Button component={Link} to="/bw">Home</Button>
            <Button>Notifications</Button>
            <Button component={Link} to="/settings">Settings</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
};

module.exports = withStyles(styles)(NavBar);

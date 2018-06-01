import React from 'react';

import ProjectTimeframe from './ProjectTimeframe';
import {
    Button,
    Card,
    CardHeader,
    CardContent,
    Typography,
    withStyles
  } from "material-ui";

const styles = {
  card: {
    marginBottom: 16
  }
}

const Project = (props) => {
  const { classes } = props;

  const project = {
    name: props.project.fields["Project Name"],
    pm: props.project.fields["PM"],
    team: props.project.fields["Team"],
    endDate: props.project.fields["Estimated Open Date"],
    status: props.project.fields["Status Update?"]
  };

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <CardHeader title={project.name} />
          <CardContent>
            <Typography variant="subheading">
              {!project.status
              ? <div>Open</div>
              : <div>{project.status}</div> }
            </Typography>
            <div className="flex" variant="body1">
            {props.team 
                ? <div>{props.team}</div>
                : <div>No Team</div>}
                                {props.pm
                ? <div>{props.pm}</div>
                : <div>No Manager</div>}
                                {project.endDate 
                ? <div>{project.endDate}</div>
                : <div>No End Date</div>}
            </div>
            <Button>Details</Button>
            <ProjectTimeframe capacityScore={1} />
          </CardContent>
        </CardContent>
        {/* <ProjectTimeframe /> */}
      </Card>
    </div>
  )
}

module.exports = withStyles(styles)(Project);
import React from 'react';

import ProjectTimeframe from './ProjectTimeframe';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

const Project = (props) => {
  const project = {
    name: props.project.fields["Project Name"],
    pm: props.project.fields["PM"],
    team: props.project.fields["Team"],
    endDate: props.project.fields["Estimated Open Date"],
    status: props.project.fields["Status Update?"]
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="headline" component="h2">
        {project.name}  
        </Typography>
        {props.team 
        ? <div>{props.team}</div>
        : <div>No Team</div>}
        {props.pm
        ? <div>{props.pm}</div>
        : <div>No Manager</div>}
        {project.endDate 
        ? <div>{project.endDate}</div>
        : <div>No End Date</div>}
        {!project.status
        ? <div>Open</div>
        : <div>{project.status}</div> }
        <ProjectTimeframe capacityScore={1} />
      </CardContent>
      {/* <ProjectTimeframe /> */}
    </Card>
  )
}

module.exports = Project;
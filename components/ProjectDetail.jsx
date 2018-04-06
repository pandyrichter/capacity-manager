import React from 'react';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

const ProjectDetail = (props) => {
  const project = {
    name: props.project.fields["Project Name"],
    projmgr: props.project.fields["PM Submitted"],
    team: props.project.fields["Team Submitted"],
    endDate: props.project.fields["Estimated Open Date"],
    status: props.project.fields["Status Update?"]
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="headline" component="h2">
        {project.name}  
        </Typography>
        {project.projmgr 
        ? <div>{project.projmgr}</div>
        : <div>No Manager</div>}
        {project.team 
        ? <div>{project.team}</div>
        : <div>No End Date</div>}
        {project.endDate 
        ? <div>{project.endDate}</div>
        : <div>No End Date</div>}
        {!project.status
        ? <div>Open</div>
        : <div>{project.status}</div> }
      </CardContent>
    </Card>
  )
}

module.exports = ProjectDetail;
import React from 'react';

const ProjectDetail = (props) => {
  const project = {
    name: props.project.fields["Project Name"],
    projmgr: props.project.fields["PM Submitted"],
    team: props.project.fields["Team Submitted"],
    endDate: props.project.fields["Estimated Open Date"],
    status: props.project.fields["Status Update?"]
  };

  return (
    <div className="project-detail" style={!project.status ? {backgroundColor:'green'} : {backgroundColor:'red'}}>
      <div>{project.name}</div>
      <div className="project-detail__collapse">
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
      </div>
    </div>
  )
}

module.exports = ProjectDetail;
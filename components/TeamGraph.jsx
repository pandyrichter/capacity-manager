import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Chart from 'chart.js';
import ProjectDetail from './ProjectDetail';

class TeamGraph extends React.Component {
  constructor(props) {
    super(props);

    this.projectStatus = this.projectStatus.bind(this);
    this.groupProjectsByStatus = this.groupProjectsByStatus.bind(this);
  };

  projectStatus(project) {
    return !project.fields["Status Update?"] ? "Open" : "Closed";
  };

  groupProjectsByStatus(projects) {
    return _.groupBy(projects, project => {
      return project.fields["Status Update?"];
    });
  };

 render() {
    const projects = this.props.projects;
    const statusGroups = this.groupProjectsByStatus(projects);
    const statusTypes = Object.keys(statusGroups);

    return (
        <div className="team-graph">
          <h3>{this.props.office}</h3>
          <div className="team-graph__detail">
            <p>Total: {this.props.projects.length}</p>
            <p>Resolved: </p>
            <ul>
              {statusTypes.map(type => {
                if (type !== 'undefined') {
                  return <li>{type}: {statusGroups[type].length}</li>
                } else {
                  return <li>Open: {statusGroups[type].length}</li>
                }
              })}
            </ul>
            <p>Projects:</p>
            {projects.map(project => {
              return <ProjectDetail key={project.fields["Project Name"]} project={project} status={this.projectStatus(project)} />
            })}
          </div>
        </div>

    )
  }
}

module.exports = TeamGraph;
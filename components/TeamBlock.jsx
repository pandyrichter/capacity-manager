import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Chart from 'chart.js';
import ProjectDetail from './ProjectDetail';

class TeamBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      outcomes: {}
    }
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
          </div>
        </div>
    )
  }
}

module.exports = TeamBlock;
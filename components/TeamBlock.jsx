import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Chart from 'chart.js';
import ProjectDetail from './ProjectDetail';

class TeamBlock extends React.Component {
  constructor(props) {
    super(props);

    this.handleTeamChange = this.handleTeamChange.bind(this);
  };

  handleTeamChange() {
    if (this.props.activeteam) {
      this.props.onTeamChange('');
    } else {
      this.props.onTeamChange(this.props.team);
    }
  }

  groupProjectsByStatus(projects) {
    return _.groupBy(projects, project => {
      return project.fields["Status Update?"];
    });
  };

 render() {
    const projects = this.props.projects;
    const statusGroups = this.groupProjectsByStatus(projects);
    const statusTypes = Object.keys(statusGroups);

    const activeStyle = {
      border: '2px solid lightblue',
      backgroundColor: 'lightgray'
    }

    const inactiveStyle = {
      border: '2px solid lightgray'
    }

    return (
        <div 
        className="team-block"
        onClick={this.handleTeamChange}
        style={this.props.activeteam ? activeStyle : inactiveStyle }
        >
          <h3>{this.props.team}</h3>
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
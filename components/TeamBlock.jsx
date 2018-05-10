import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import ProjectDetail from './ProjectDetail';

import utils from '../helpers/utils';

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
  };

  returnArrOfMgrs(records) {
    let arr = [];
    records.forEach(r => {
      try {
        arr = [...arr, ...r["PM Submitted"]];
      } catch (e) {}
    })
    return arr;
  };

 render() {
    const projects = this.props.projects;
    const pms = this.returnArrOfMgrs(projects);
    const uniquePms = _.uniq(pms);

    const activeStyle = {
      border: '2px solid lightblue',
      backgroundColor: 'lightgray',
    };

    const inactiveStyle = {
      border: '2px solid lightgray',
    };

    return (
      <div 
        className="team-block"
        onClick={this.handleTeamChange}
        style={this.props.activeteam ? activeStyle : inactiveStyle }
        >
        <h3>{this.props.team}</h3>
        <ul>
          {uniquePms.map(pm => <li>{pm}</li>)}
        </ul>
      </div>
    )
  }
}

TeamBlock.propTypes = {
  projects: PropTypes.array
};

module.exports = TeamBlock;
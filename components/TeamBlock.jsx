import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Chart from 'chart.js';
import ProjectDetail from './ProjectDetail';
import utils from '../helpers/utils';

const BarChart = require('react-chartjs').Bar;

class TeamBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      statusGroups: {},
      statusCalc: true
    }

    this.handleTeamChange = this.handleTeamChange.bind(this);
  };

  // on mount, save status report to state
  componentDidMount() {
    const projects = this.props.projects;
    const statusGroups = this.groupProjectsByStatus(projects);
    this.setState({statusGroups});
    this.setState({statusCalc: false});
  };

  handleTeamChange() {
    if (this.props.activeteam) {
      this.props.onTeamChange('');
    } else {
      this.props.onTeamChange(this.props.team);
    }
  };

  groupProjectsByStatus(projects) {
    return _.groupBy(projects, project => {
      return project["Status Update?"];
    });
  };

 render() {
    const calcPerc = utils.calcPerc;
    
    const projects = this.props.projects;
    const projectCount = projects.length;

    const status = this.state.statusGroups;

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
        {/* {this.state.statusCalc
        ? <p>Chart Loading</p>
        : <BarChart data={statusData} />} */}
        <div className="team-graph__detail">
          <p>Total: {projects.length}</p>
          {this.state.statusCalc
          ? <p><strong>Loading Report</strong></p>
          : <p>
            Open: {status['undefined'].length} | {calcPerc((status['undefined'].length), (projectCount))}
            <br/>
            On Hold: {status['On Hold'].length} | {calcPerc((status['On Hold'].length), (projectCount))}
            <br/>
            Contract Negotiation: {status['Contract Negotiation'].length} | {calcPerc((status['Contract Negotiation'].length), (projectCount))}
            <br/>
            Closed: {status['Closed Won'].length + status['Closed Lost'].length} | {calcPerc((status['Closed Won'].length + status['Closed Lost'].length), (projectCount))}              
            <br/>
            Win Rate: {calcPerc((status['Closed Won'].length), (projectCount))}
            <br/> 
            Lose Rate: {calcPerc((status['Closed Lost'].length), (projectCount))}
            </p>}
        </div>
      </div>
    )
  }
}

module.exports = TeamBlock;
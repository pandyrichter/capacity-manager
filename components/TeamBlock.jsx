import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Chart from 'chart.js';
import ProjectDetail from './ProjectDetail';

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
      return project.fields["Status Update?"];
    });
  };

  calcPerc(num, den) {
    let calc = num / den;
    let f = calc * 100;
    let fixed = Number.parseFloat(f).toFixed(2);
    return (`${fixed}%`)
  };

 render() {
    const projects = this.props.projects;
    const projectCount = projects.length;

    const status = this.state.statusGroups;

    const activeStyle = {
      border: '2px solid lightblue',
      backgroundColor: 'lightgray'
    };

    const inactiveStyle = {
      border: '2px solid lightgray'
    };

    return (
      <div 
        className="team-block"
        onClick={this.handleTeamChange}
        style={this.props.activeteam ? activeStyle : inactiveStyle }
        >
        <h3>{this.props.team}</h3>
        <div className="team-graph__detail">
          <p>Total: {projects.length}</p>
          {this.state.statusCalc
          ? <p><strong>Loading Report</strong></p>
          : <p>
            Open: {status['undefined'].length} | {this.calcPerc((status['undefined'].length), (projectCount))}
            <br/>
            On Hold: {status['On Hold'].length} | {this.calcPerc((status['On Hold'].length), (projectCount))}
            <br/>
            Contract Negotiation: {status['Contract Negotiation'].length} | {this.calcPerc((status['Contract Negotiation'].length), (projectCount))}
            <br/>
            Closed: {status['Closed Won'].length + status['Closed Lost'].length} | {this.calcPerc((status['Closed Won'].length + status['Closed Lost'].length), (projectCount))}              
            <br/>
            Win Rate: {this.calcPerc((status['Closed Won'].length), (projectCount))}
            <br/> 
            Lose Rate: {this.calcPerc((status['Closed Lost'].length), (projectCount))}
            </p>}
        </div>
      </div>
    )
  }
}

module.exports = TeamBlock;
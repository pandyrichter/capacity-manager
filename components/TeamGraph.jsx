import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'chart.js';

class TeamGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamProjects: []
    }
    this.filterProjectsByTeam = this.filterProjectsByTeam.bind(this);
    this.filterProjectsByStatus = this.filterProjectsByStatus.bind(this);
  }

  componentDidMount() {
    const teamProjects = this.filterProjectsByTeam(this.props.office);
    this.setState({teamProjects: [...teamProjects]})
  }

  filterProjectsByTeam(str) {
    const projects = this.props.projects;
    return projects.filter(project => project.fields["Office Submitted"] && project.fields["Office Submitted"].includes(str));
  }

  filterProjectsByStatus(status) {
    const statusTypes = ["Closed Won", "Closed Lost", "Closed Other / On Hold", "Contract Negotation"];
    // reduce function to break down by status
  }

  render() {
    return (
        <div className="team-graph">
          <h3>{this.props.office}</h3>
          <div className="team-graph__detail">
            <p>Total: {this.state.teamProjects.length}</p>
            <p>Resolved: </p>
            <ul>
            </ul>
            <p>Active:</p>
          </div>
        </div>

    )
  }
}

module.exports = TeamGraph;
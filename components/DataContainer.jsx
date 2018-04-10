import React from 'react';
import axios from 'axios';
import config from '../config';
import TeamBlock from './TeamBlock';
import ProjectDetail from './ProjectDetail';

class DataContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      projectsLoading: true,
      projects: [],
      activeTeam: ''
    };

    this.checkForBatch = this.checkForBatch.bind(this);
    this.handleTeamChange = this.handleTeamChange.bind(this);
  };

  componentDidMount() {
    this.checkForBatch();
  };

  /* 
  1 Load initial batch from Airtable
  2 Save records from inital batch to state
  3 If batch contains offset:
    Load records using offset in params
    Save records to state
  4 If batch doesnt contain offset:
    Stop
  */

  checkForBatch(offset='') {
    let self = this;
    const apiUrl = `${config.api}${offset}`;
    const apiAuth = `${config.key}`;

    axios.get(apiUrl, {
      headers: { Authorization: apiAuth }
    }).then(res => {
      self.setState({
        projects: [...self.state.projects, ...res.data.records]
      });
      self.checkForOffset(res.data.offset);
    });
  };

  checkForOffset(offset) {
    // offset indicates additional records in Airtable
    offset ? this.checkForBatch(`?offset=${offset}`) : this.setState({projectsLoading: false});
  };

  handleTeamChange(o) {
    this.setState({activeTeam: o});
  };

  filterProjectsByTeam(projects, str) {
    if (str === '') {
      return projects;
    } else {
      return projects.filter(p => {
        return p.fields["Office Submitted"] && p.fields["Office Submitted"].includes(str);
      });
    }
  };

  filterProjectsByStr(projects, prop, str) {
    return projects.filter(p => {
      // some props are arrays, so therefore need to .some > .includes
      return p.fields[prop].toLowerCase().includes(str.toLowerCase());
    });
  };

  filterProjectsByStatus(projects, s) {
    switch (s) {
      case "Closed":
        return projects.filter(p => p.fields["Status Update?"]);
      case "Outstanding":
        return projects.filter(p => !p.fields["Status Update?"]);
      case "Assigned":
        return projects.filter(p => p.fields["PM Submitted"]);
      case "Unassigned":
        return projects.filter(p => !p.fields["PM Submitted"]);
      default:
        return projects;
    }
  };

  sortProjectsByProp(projects, prop) {
    return projects.sort((a,b) => {
      let projA = a.fields[prop].toLowerCase();
      let projB = b.fields[prop].toLowerCase();

      if (projA < projB) {
        return -1;
      }
      if (projA > projB) {
        return 1;
      }
      return 0;
    });
  };

  render() {
    const teams = ["Boulder", "Chicago", "Dallas", "Latin America"];
    const projects = this.state.projects;
    const teamProjects = this.filterProjectsByTeam(projects, this.state.activeTeam);
    const searchedProjects = this.filterProjectsByStr(teamProjects, "Project Name", this.props.searchTerm);
    const filteredProjects = this.filterProjectsByStatus(searchedProjects, this.props.filterParam);
    const sortedProjects = this.sortProjectsByProp(filteredProjects, "Project Name");

    return (
      <div>
        {this.state.projectsLoading
         ? <div className="data-container">
            <p>Loading</p>
           </div>
         : <div className="data-container">
              <div className="graphs-detail">
                {teams.map(team => {
                  const teamProjects = projects.filter(project => project.fields["Office Submitted"] && project.fields["Office Submitted"].includes(team));
                  return (
                  <TeamBlock 
                    key={team} 
                    team={team} 
                    projects={teamProjects}
                    activeteam={team === this.state.activeTeam} 
                    onTeamChange={this.handleTeamChange}
                    />
                  );
                })}
              </div>
              <div className="projects-detail">
                <h5>{this.props.filterParam} Projects: {sortedProjects.length}</h5>
                <div className="projects-detail__overflow">
                  {sortedProjects
                    .map(project => {
                    return <ProjectDetail key={project.fields["Project Name"]} project={project} />
                  })}
                </div>
              </div>
          </div>}
      </div>
    )
  };
};

module.exports = DataContainer;
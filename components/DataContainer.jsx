import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import TeamBlock from "./TeamBlock";
import ProjectDetail from "./ProjectDetail";

import DataCall from '../helpers/data';

class DataContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectsLoading: true,
      projects: [],
      activeTeam: ""
    };

    this.handleTeamChange = this.handleTeamChange.bind(this);
  }

  componentDidMount() {
    let self = this;
    DataCall().then(res => {
      self.setState({
        projects: [...res],
        projectsLoading: false
      });
    });
  };

  /* 
  HANDLE DATA FILTERING AND SEARCH
  */

  groupProjectsByTeam(projects) {
    return _.groupBy(projects, project => {
      try {
        return project["Team Submitted"];
      } catch (e) {
        return ("No team identified");
      }
    });
  }

  handleTeamChange(o) {
    this.setState({ activeTeam: o });
  }

  filterProjectsByTeam(projects, str) {
    if (str === "") {
      return projects;
    } else {
      return projects.filter(p => {
        return (
          p["Office Submitted"] &&
          p["Office Submitted"].includes(str)
        );
      });
    }
  }

  filterProjectsByStr(projects, prop, str) {
    return projects.filter(p => {
      // FIXME: some props are arrays, so therefore need to .some > .includes
      try {
        return p[prop].toLowerCase().includes(str.toLowerCase());
      } catch (e) {
        console.error(e);
      }
    });
  }

  filterProjectsByStatus(projects, s) {
    switch (s) {
      case "Closed":
        return projects.filter(p => p["Status Update?"]);
      case "Outstanding":
        return projects.filter(p => !p["Status Update?"]);
      // FIXME: Following cases were removed
      case "Assigned":
        return projects.filter(p => p["PM Submitted"]);
      case "Unassigned":
        return projects.filter(p => !p["PM Submitted"]);
      default:
        return projects;
    }
  }

  sortProjectsByProp(projects, prop) {
    return projects.sort((a, b) => {
      let projA = a[prop].toLowerCase();
      let projB = b[prop].toLowerCase();

      if (projA < projB) {
        return -1;
      }
      if (projA > projB) {
        return 1;
      }
      return 0;
    });
  }

  render() {
    const projects = this.state.projects;
    
    const groupedTeam = this.groupProjectsByTeam(projects);
    const teams = Object.keys(groupedTeam);
    console.log(teams);
    const teamProjects = this.filterProjectsByTeam(
      projects,
      this.state.activeTeam
    );
    const searchedProjects = this.filterProjectsByStr(
      teamProjects,
      "Project Name",
      this.props.searchTerm
    );
    const filteredProjects = this.filterProjectsByStatus(
      searchedProjects,
      this.props.filterParam
    );
    const sortedProjects = this.sortProjectsByProp(
      filteredProjects,
      "Project Name"
    );

    return (
      <div>
        {this.state.projectsLoading ? (
          <div className="data-container">
            <p>Loading</p>
          </div>
        ) : (
          <div className="content-grid">
            {/* Visuals */}
            <div className="visuals-detail">
            Visuals
            {/* <div>{groupedTeam}</div> */}
            </div>
            <div className="teams-detail">
              {/* Teams */}
              {teams.map(team => {
                const tprojects = projects.filter(
                  project =>
                    project["Office Submitted"] &&
                    project["Office Submitted"].includes(team)
                );
                return (
                  <TeamBlock
                    key={team}
                    team={team}
                    projects={tprojects}
                    activeteam={team === this.state.activeTeam}
                    onTeamChange={this.handleTeamChange}
                  />
                );
              })}
            </div>
            {/* Projects */}
            <div className="projects-detail">
              <h5>
                {this.props.filterParam} Projects: {sortedProjects.length}
              </h5>
              <div className="projects-detail__overflow">
                {sortedProjects.map(project => {
                  return (
                    <ProjectDetail
                      key={project["Project Name"]}
                      project={project}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

DataContainer.propTypes = {
  searchTerm: PropTypes.string,
  filterParam: PropTypes.string
};

module.exports = DataContainer;

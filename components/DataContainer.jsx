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

  cleanProjectNames(projects) {
    return projects.map(p => {
      if (!p["Team Submitted"]) {
        p["Team Submitted"] = "Unassigned";
      }
      return p;
    })
  }

  groupByCat(records, cat) {
    return _.groupBy(records, record => record[cat]);
  }

  handleTeamChange(t) {
    this.setState({ activeTeam: t });
  }

  // Flowthrough of projects: By team > By Search > By Filter > Sorted

  filterProjectsByTeam(projects, str) {
    if (str === "") {
      return projects;
    } else {
      return projects.filter(p => {
        return (
          p["Team Submitted"] &&
          p["Team Submitted"].includes(str)
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
      case "Outstanding":
        return projects.filter(p => !p["Status Update"]);
      case "Won":
        return projects.filter(p => p["Status Update"] === "Closed Won");
      case "Lost":
        return projects.filter(p => p["Status Update"] === "Closed Lost");
      case "Closed":
        return projects.filter(p => p["Status Update"]);
      default:
        return projects;
    }
  }

  sortProjectsByProp(projects, cat) {
    return projects.sort((a, b) => {
      let projA = a[cat].toLowerCase();
      let projB = b[cat].toLowerCase();

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

    const cleanProjects = this.cleanProjectNames(projects);
    const groupedTeams = this.groupByCat(cleanProjects, "Team Submitted");
    
    const teams = Object.keys(groupedTeams);

    const teamProjects = this.filterProjectsByTeam(
      cleanProjects,
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
            </div>
            <div className="teams-detail">
              {/* Teams */}
              {teams.map(team => {
                const tprojects = projects.filter(
                  project =>
                    project["Team Submitted"] &&
                    project["Team Submitted"].includes(team)
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
              <h3>{!this.state.activeTeam ? "All Teams" : this.state.activeTeam}</h3>
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

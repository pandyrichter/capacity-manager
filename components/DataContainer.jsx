import React from "react";
import PropTypes from "prop-types";
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
    // run checkForBatch from helper
    // once complete, setState via spread
    DataCall.loadProjectsFromAirtable();
  }

  /* 
  HANDLE DATA FILTERING AND SEARCH
  */

  handleTeamChange(o) {
    this.setState({ activeTeam: o });
  }

  filterProjectsByTeam(projects, str) {
    if (str === "") {
      return projects;
    } else {
      return projects.filter(p => {
        return (
          p.fields["Office Submitted"] &&
          p.fields["Office Submitted"].includes(str)
        );
      });
    }
  }

  filterProjectsByStr(projects, prop, str) {
    return projects.filter(p => {
      // FIXME: some props are arrays, so therefore need to .some > .includes
      try {
        return p.fields[prop].toLowerCase().includes(str.toLowerCase());
      } catch (e) {
        console.error(e);
      }
    });
  }

  filterProjectsByStatus(projects, s) {
    switch (s) {
      case "Closed":
        return projects.filter(p => p.fields["Status Update?"]);
      case "Outstanding":
        return projects.filter(p => !p.fields["Status Update?"]);
      // FIXME: Following cases were removed
      case "Assigned":
        return projects.filter(p => p.fields["PM Submitted"]);
      case "Unassigned":
        return projects.filter(p => !p.fields["PM Submitted"]);
      default:
        return projects;
    }
  }

  sortProjectsByProp(projects, prop) {
    return projects.sort((a, b) => {
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
  }

  render() {
    const teams = ["Boulder", "Chicago", "Dallas", "Latin America"];
    const projects = this.state.projects;
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
            <div className="visuals-detail">Visuals</div>
            <div className="teams-detail">
              {/* Teams */}
              {teams.map(team => {
                const tprojects = projects.filter(
                  project =>
                    project.fields["Office Submitted"] &&
                    project.fields["Office Submitted"].includes(team)
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
                      key={project.fields["Project Name"]}
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

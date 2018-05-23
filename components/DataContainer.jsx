import React from "react";
import { Route, Link } from "react-router-dom";
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
    const self = this;
    const routeTeam = this.props.routerLoc.pathname.substring(1);
    DataCall().then(res => {
      self.setState({
        projects: [...res],
        projectsLoading: false,
        activeTeam: routeTeam
      });
    });
  };

  
  handleTeamChange(t) {
    this.setState({ activeTeam: t });
  }

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
  
  pullOSEProjects(projects) {
    return projects.filter(p => {
      return p["OS&E"];
    })
  }

  groupByCat(records, cat) {
    return _.groupBy(records, record => record[cat]);
  }

  /*
  Flowthrough of projects: By team > By Search > By Filter > Sorted
  */

  filterProjectsByTeam(projects, str=this.state.activeTeam) {
    if (str === "") {
      return projects;
    } else if (str === "Team OSE") {
      return this.pullOSEProjects(projects);
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

    // Am I doing something redundant between this and teamProjects from filter?
    const oseProjects = this.pullOSEProjects(cleanProjects);

    const teams = Object.keys(groupedTeams);

    const teamProjects = this.filterProjectsByTeam(
      cleanProjects,
      // FIXME: This won't work when you add PMs
      this.props.routerLoc.pathname.substring(1)
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
          <div className="loading-container">
            <p>Loading</p>
          </div>
        ) : (
          <div className="content-grid">
            {/* Visuals */}
            <div className="visuals-detail">
            <div className="flex">All Teams {!this.state.activeTeam 
              ? "" 
              : <div className="flex">
                  <div>{this.props.routerLoc.pathname}</div>
                </div>}
            </div>
            </div>
            <div className="teams-detail">
              {/* FFE Teams */}
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
                    teamIsOSE={false}
                    routerHist={this.props.routerHist}
                  />
                );
              })}
              {/* OSE Team */}
              <TeamBlock 
                team="Team OSE"
                projects={oseProjects}
                activeteam={"Team OSE" === this.state.activeTeam}
                onTeamChange={this.handleTeamChange}
                teamIsOSE={true}
                routerHist={this.props.routerHist}
              />
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

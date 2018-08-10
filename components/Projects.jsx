import React from "react";
import PropTypes from "prop-types";
import queryString from "query-string";

import Project from "./Project";

import { lookupTeamById, lookupPmById } from "../helpers/data";
import { ifPropExists } from "../helpers/utils";

// Replace this with call to Airtable
function filterProjectsbyTeam(ps, team="") {
  if (team === "bw") {
    return ps;
  }
  else {
    return ps.filter(p => {
      return (
        p.fields["Team Submitted"] &&
        p.fields["Team Submitted"].includes(team)
      );
    });
  }
};

function getFilteredProjects(projects, filter) {
  switch (filter) {
    case ProjectFilters.SHOW_ALL:
      return projects;
    case ProjectFilters.SHOW_OUTSTANDING:
      return projects.filter(p => !p.fields["Status Update"]);
    case ProjectFilters.SHOW_WON:
      return projects.filter(p => p["Status Update"] === "Closed Won");
    case ProjectFilters.SHOW_LOST:
      return projects.filter(p => p["Status Update"] === "Closed Lost");
    default:
      throw new Error('Unknown filter:' + filter);
  }
}

function filterProjectsByStatus(ps, f) {
  switch (f) {
    case "Outstanding":
      return ps.filter(p => !p.fields["Status Update"]);
    case "Won":
      return ps.filter(p => p.fields["Status Update"] === "Closed Won");
    case "Lost":
      return ps.filter(p => p.fields["Status Update"] === "Closed Lost");
    case "Closed":
      return ps.filter(p => p.fields["Status Update"]);
    default:
      return ps;
  }
};

function Projects (props) {
  const { projects, projectManagers, teams } = props;

  const { teamName } = props.match.params;
  const { filter } = queryString.parse(props.location.search);

  const teamProjects = filterProjectsbyTeam(projects, teamName);
  const filteredProjects = filterProjectsByStatus(teamProjects, filter);

  return (
    <div>
        {filteredProjects.map((p, id) => {
            const pmId = ifPropExists(p.fields, "PM");
            const teamId = ifPropExists(p.fields, "Team");
            return (
              <Project 
                key={id} 
                project={p}
                team={lookupTeamById(teams, teamId)}
                pm={lookupPmById(projectManagers, pmId)} 
              />
            )
        })}
    </div>
  )
};

Projects.propTypes = {
  projects: PropTypes.array
};

module.exports = Projects;

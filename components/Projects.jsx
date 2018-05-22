import React from "react";
import queryString from "query-string";

// Replace this with call to Airtable
function filterProjectsbyTeam(ps, team="") {
  if (team === "bw") {
    return ps;
  }
  else {
    return ps.filter(p => {
      return (
        p["Team Submitted"] &&
        p["Team Submitted"].includes(team)
      );
    });
  }
}

function filterProjectsByStatus(ps, f) {
  switch (f) {
    case "Outstanding":
      return ps.filter(p => !p["Status Update"]);
    case "Won":
      return ps.filter(p => p["Status Update"] === "Closed Won");
    case "Lost":
      return ps.filter(p => p["Status Update"] === "Closed Lost");
    case "Closed":
      return ps.filter(p => p["Status Update"]);
    default:
      return ps;
  }
}

export default function Projects (props) {
  const projects = props.projects;

  const { teamName } = props.match.params;
  const { filter } = queryString.parse(props.location.search);

  const teamProjects = filterProjectsbyTeam(projects, teamName);
  const filteredProjects = filterProjectsByStatus(teamProjects, filter);

  return (
    <div>
      <h2>Projects!</h2>
      <p>Filter: {filter}</p>
      <ul>
        {filteredProjects.map((p, id) => <li key={id}>{p["Project Name"]}</li>)}
      </ul>
    </div>
  )
}

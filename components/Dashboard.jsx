import React from "react";
import { Route, Link } from "react-router-dom";
import queryString from "query-string";

import TeamView from "./TeamView";
import Projects from "./Projects";
import FilterBar from "./FilterBar";

import { fetchProjectRecords, fetchTeams } from "../helpers/data";

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      teams: [],
      teamsLoading: true,
      projects: [],
      projectsLoading: true
    }
  }

  componentDidMount() {
    // Dynamically retrieve team data
    fetchTeams().then(res => {
      this.setState({
        teams: [...res],
        teamsLoading: false
      });
    });

    fetchProjectRecords().then(res => {
      this.setState({
        projects: [...res],
        projectsLoading: false
      });
    });
  }

  render() {
    const { projects, projectsLoading, teams } = this.state;
    const { filter } = queryString.parse(this.props.location.search);

    const checkForFilter = (f) => f ? `?filter=${f}` : '';

    // TODO: Filter, search, sort projects here, then pass to components?

    return (
      <div className="dashboard">
        <Route render={(props) => <FilterBar {...props} activeFilter={filter} />} />
        {this.state.projectsLoading
        ? <div>Loading</div>
        : (<div>
        <div className="teams">
          <h2>Teams: </h2>
          <Link 
            to={{
              pathname: `/bw`,
              search: checkForFilter(filter)
            }}
            className='team-link'
            >All Teams
          </Link>
          {teams.map(team => {
            return (
              <Link
                key={team["Team Name"]} 
                to={{
                  pathname: `/${team["Team Name"]}`,
                  search: checkForFilter(filter)
                }}
                className='team-link'
                >{team["Team Name"]}
              </Link>
            )
          })}
        </div>
        <div className="dashboard__content">
          <Route render={(props) => <TeamView {...props} projects={projects}/>} />
          <Route render={(props) => <Projects {...props} projects={projects}/>} />
        </div>
        </div>)}
      </div>
    )
  }
}

module.exports = Dashboard;

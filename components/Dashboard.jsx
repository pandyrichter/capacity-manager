import React from "react";
import { Route, Link } from "react-router-dom";
import queryString from "query-string";

import TeamView from "./TeamView";
import Projects from "./Projects";
import FilterBar from "./FilterBar";

import { fetchProjectRecords, fetchTeams, fetchProjectManagers } from "../helpers/data";

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      teams: [],
      teamsLoading: true,
      projects: [],
      projectsLoading: true,
      projectManagers: []
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

    fetchProjectManagers().then(res => {
      this.setState({projectManagers: [...res]});
    });
  }

  render() {
    const { projects, projectsLoading, teams, projectManagers } = this.state;
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
                key={team.id} 
                to={{
                  pathname: `/${team.fields["Team Name"]}`,
                  search: checkForFilter(filter)
                }}
                className='team-link'
                >{team.fields["Team Name"]}
              </Link>
            )
          })}
        </div>
        <div className="dashboard__content">
          <Route render={(props) => <TeamView {...props} projects={projects}/>} />
          <Route render={(props) => {
            return (
              <Projects 
              {...props} 
              projects={projects}
              teams={teams} 
              projectManagers={projectManagers}
              />
            )
          }} />
        </div>
        </div>)}
      </div>
    )
  }
}

module.exports = Dashboard;

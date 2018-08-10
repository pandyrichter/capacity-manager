import React from "react";
import { Route, Link } from "react-router-dom";
import queryString from "query-string";

import TeamView from "./TeamView";
import Projects from "./Projects";
import FilterBar from "./FilterBar";
import SearchBar from "./SearchBar";
import ResourceContainer from "./ResourceContainer";

import { 
  Paper, 
  Chip,
  CircularProgress,
  LinearProgress,
  Typography,
  Divider,
  withStyles
  } from "material-ui";

import { fetchProjectRecords, fetchTeams, fetchProjectManagers } from "../helpers/data";

const styles = {
  resources: {
    padding: 20,
  },
  teams: {
    height: 75,
    padding: 10
  },
  pms: {
    height: 75,
    padding: 10,
    overflowX: 'scroll'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '50% 50%',
    padding: 20
  },
  projects: {
    padding: 15
  }
};

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      teams: [],
      teamsLoading: true,
      projectManagers: [],
      pmsLoading: true,
      projects: [],
      projectsLoading: true,
      searchTerm: "",
      filterParam: "Oustanding"
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

    fetchProjectManagers().then(res => {
      this.setState({
        projectManagers: [...res],
        pmsLoading: false
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
    const { projects, projectsLoading, teams, projectManagers } = this.state;
    const { filter } = queryString.parse(this.props.location.search);
    const { classes } = this.props;

    const checkForFilter = (f) => f ? `?filter=${f}` : '';

    return (
      <div>
        <Paper>
          <div className={classes.resources}>
            <div className={classes.teams}>
              {this.state.teamsLoding
              ? <div className="flex">Teams: <span><CircularProgress /></span></div>
              : <Route render={(props) => <ResourceContainer {...props} resourceType="Teams" resources={teams}/>} />}
            </div>
            <Divider />
            <div className={classes.pms}>
              {this.state.pmsLoading
              ? <div className="flex">Project Managers: <span><CircularProgress /></span></div>
              : <Route render={(props) => <ResourceContainer {...props} resourceType="Project Managers" resources={projectManagers}/>} />}
            </div>
          </div>
        </Paper>
        <Divider />
        {this.state.projectsLoading
        ? <LinearProgress color="secondary"/>
        : (
          <Paper>
            <div className={classes.content}>
              <Route render={(props) => <TeamView {...props} projects={projects}/>} />
              <Paper>
                  <div className={classes.projects}>    
                    <Typography variant="title" gutterBottom>{filter ? `${filter} Projects` : 'All Projects'}</Typography>
                    <Divider />
                    {/* Using route to access history... But is this always necessary? */}
                    <Route render={(props) => <SearchBar {...props} />} />
                    <Route render={(props) => <FilterBar {...props} activeFilter={filter} />} />
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
              </Paper>
            </div>
          </Paper>
        )}
        </div>
    )
  }
}

module.exports = withStyles(styles)(Dashboard);

import React from 'react';
import axios from 'axios';
import api from '../helpers/api';
import Airtable from 'airtable';
import TeamBlock from './TeamBlock';
import ProjectDetail from './ProjectDetail';

const base = new Airtable({apiKey: 'keyMMhm1hEx7OtaIC'}).base('apputYC83th3otdfX');

class DataContainer extends React.Component {
  constructor () {
    super();
    this.state = {
      projectsLoading: true,
      projects: [],
    }
    this.checkForBatch = this.checkForBatch.bind(this);
  }

  componentDidMount() {
    this.checkForBatch();
  }

  /* 
  1 Load initial batch
  2 Save records from inital batch to state
  3 If batch containts offset:
    Load records using offset in params
    Save records to state
  4 If batch doesnt contain offset:
    Stop
  */

  checkForBatch(offset='') {
    let self = this;
    const apiUrl = `https://api.airtable.com/v0/apputYC83th3otdfX/Team%20Tracking${offset}`;
    const apiAuth = 'Bearer keyMMhm1hEx7OtaIC'

    axios.get(apiUrl, {
      headers: { Authorization: apiAuth }
    }).then(res => {
      self.setState({
        projects: [...self.state.projects, ...res.data.records]
      });
      self.checkForOffset(res.data.offset);
    })
  }

  checkForOffset(offset) {
    // offset indicates additional records in Airtable
    if (offset) {
      // load next batch
      this.checkForBatch(`?offset=${offset}`)
    } else {
      this.setState({projectsLoading: false});
    }
  }

  filterProjectsByProp(projects, prop, str) {
    return projects.filter(project => {
      // some props are arrays, so therefore need to .some > .includes
      return project.fields[prop].includes(str);
    });
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
    const filteredProjects = this.filterProjectsByProp(projects, "Project Name", "Hilton");
    const sortedProjects = this.sortProjectsByProp(filteredProjects, "Project Name");

    return (
      <div>
        <p>Total: {projects.length}</p>
        {this.state.projectsLoading
         ? <div className="data-container">
            <p>Loading</p>
           </div>
         : <div className="data-container">
              <div className="graphs-detail">
                {teams.map(team => {
                  const teamProjects = projects.filter(project => project.fields["Office Submitted"] && project.fields["Office Submitted"].includes(team));
                  return <TeamBlock key={team} office={team} projects={teamProjects} />
                })}
              </div>
              <div className="projects-detail">
                <h5>Projects</h5>
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
  }
};

module.exports = DataContainer;
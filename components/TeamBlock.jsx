import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import ProjectDetail from "./ProjectDetail";
import UserChip from "./UserChip";

import utils from "../helpers/utils";

class TeamBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activePM: ""
    };

    this.handleTeamChange = this.handleTeamChange.bind(this);
    this.handlePMChange = this.handlePMChange.bind(this);
  }

  handleTeamChange() {
    if (this.props.activeteam) {
      this.props.onTeamChange("");
    } else {
      this.props.onTeamChange(this.props.team);
    }
  }

  handlePMChange(pm) {
    this.setState({ activePM: pm });
  }

  returnArrOfMgrs(records, ose = false) {
    let arr = [];
    let param = "PM Submitted";
    if (ose) {
      param = "OS&E";
    }
    records.forEach(r => {
      try {
        arr = [...arr, ...r[param]];
      } catch (e) {}
    });
    return arr;
  }

  returnArrOfOffice(records) {
    let arr = [];
    records.forEach(r => {
      try {
        arr = [...arr, ...r["Office Submitted"]];
      } catch (e) {}
    });
    return arr;
  }

  render() {
    const projects = this.props.projects;

    const pms = this.returnArrOfMgrs(projects, this.props.teamIsOSE);
    const uniquePms = _.uniq(pms);

    // Placeholder for office return
    const offices = this.returnArrOfOffice(projects);
    const office = _.uniq(offices);

    // Styles for selected Teams
    const activeStyle = {
      border: "2px solid lightblue",
      backgroundColor: "lightgray"
    };

    const inactiveStyle = {
      border: "2px solid lightgray"
    };

    return (
      <div
        className="team-block"
        onClick={this.handleTeamChange}
        style={this.props.activeteam ? activeStyle : inactiveStyle}
      >
        <div>{office[0]}</div>
        <h3>{this.props.team}</h3>
        {uniquePms.map(pm => {
          return (
            <UserChip 
            key={pm}
            pm={pm}
            onPMChange={this.handlePMChange}
            activepm={pm === this.state.activePM}
            />
          )
        })}
      </div>
    );
  }
}

TeamBlock.propTypes = {
  projects: PropTypes.array
};

module.exports = TeamBlock;

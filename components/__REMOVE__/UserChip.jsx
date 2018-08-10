import React from 'react';

class UserChip extends React.Component {
  constructor (props) {
    super(props);

    this.handlePMChange = this.handlePMChange.bind(this);
  }

  handlePMChange(e) {
    e.stopPropagation();
    this.props.onPMChange(this.props.pm)
    console.log(this.props.pm);
  }

  render () {
    const activeStyle = {
      border: "2px solid lightblue",
      backgroundColor: "lightyellow",
      color: "#333"
    };

    const inactiveStyle = {
      border: "2px solid lightgray"
    };

    return (
      <div
      className="user-chip"
      onClick={this.handlePMChange}
      style={this.props.activepm ? activeStyle : inactiveStyle}
      >
      {this.props.pm}
      </div>
    )
  }
};

module.exports = UserChip;
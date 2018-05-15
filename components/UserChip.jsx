import React from 'react';

class UserChip extends React.Component {
  constructor (props) {
    super(props);

    this.handlePMChange = this.handlePMChange.bind(this);
  }

  handlePMChange() {
    this.props.onPMChange(this.props.pm)
    console.log(this.props.pm);
  }

  render () {
    return (
      <div
      className="user-chip"
      onClick={this.handlePMChange}
      >
      {this.props.pm}
      </div>
    )
  }
};

module.exports = UserChip;
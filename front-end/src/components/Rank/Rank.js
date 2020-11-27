import React, { Component } from "react";

class Rank extends Component {
  render() {
    return (
      <div>
        <div className="white f3">
          {this.props.name}, your current entry count is ...
        </div>
        <div className="white f1">#{this.props.rank}</div>
      </div>
    );
  }
}

export default Rank;

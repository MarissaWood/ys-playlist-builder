import React, { Component } from "react";

class SongDisplay extends Component {
  render() {
    return (
      <div>
        <p>
          {this.props.title}, by {this.props.artist}{" "}
        </p>
      </div>
    );
  }
}

export default SongDisplay;

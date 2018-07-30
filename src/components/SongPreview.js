import React, { Component } from "react";
// import { Link } from "react-router-dom";
import "./SongPreview.css";
import SongDetail from "./SongDetail";

class SongPreview extends Component {
  render() {
    return (
      <div className="song-preview">
        <img src={this.props.image} alt="song preview" />
        <p>
          {this.props.title}, by {this.props.artist}
        </p>
        <SongDetail id={this.props.id} token={this.props.token} />
      </div>
    );
  }
}

export default SongPreview;

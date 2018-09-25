import React, { Component } from "react";
import "./SongDisplay.css";
import songTime from "../images/Icon_Time_Black.png";

class SongDisplay extends Component {
  render() {
    return (
      <div className="playlist-song">
        <div className="topRow">
          <img src={this.props.image} alt="album art" className="album" />
          <p className="title">
            <strong>{this.props.title}</strong>
            <br /> {this.props.artist}
          </p>
        </div>
        <div className="bottom-row">
          <div>BPM: </div> <div className="BPM">{this.props.bpm}</div>
          <img src={songTime} />
          <div>{this.props.time}</div>
        </div>
      </div>
    );
  }
}

export default SongDisplay;

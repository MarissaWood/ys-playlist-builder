import React, { Component } from "react";
import "./SongDisplay.css";
import songTime from "../images/Icon_Time_Black.png";
import arrow from "../images/Icon_Up.png";

class SongDisplay extends Component {
  constructor(props) {
    super(props)
  }
  render() {

    let arrowUp 
    let arrowDown

    if (this.props.index === 0) {
      arrowUp = (<div className="reorder-empty"></div>)
    } else {
      arrowUp = (<img src={arrow} className="reorder" onClick={() => this.props.moveSongUp(this.props.index)}></img>)
    }

    if (this.props.index === this.props.playlistLength - 1) {
      arrowDown = (<div className="reorder-empty"></div>)
    } else {
      arrowDown = (<img src={arrow} alt="DOWN" className="reorder-down" onClick={() => this.props.moveSongDown(this.props.index)}></img>)
    }


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
          <img src={songTime} alt="time" />
          <div>{this.props.time}</div>
          {arrowUp}
          {arrowDown}
        </div>
      </div>
    );
  }
}

export default SongDisplay;

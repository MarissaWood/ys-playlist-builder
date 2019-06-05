import React, { Component } from "react";
import SongDisplay from "./Playlist_SongDisplay";
import playlist from "../images/Icon_Playlist_White.svg";
import "./Playlist.css";

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {playlistSaved: false};

    // This binding is necessary to make `this` work in the callback
    this.handleSave = this.handleSave.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleSave(e) {
    this.props.savePlaylist(e)
    this.setState(state => ({
      playlistSaved: true
    }));
  }

  handleClear(e) {
    this.props.clearPlaylist(e)
    this.setState(state => ({
      playlistSaved: false
    }));
  }

  msToTime = duration => {
    let seconds = parseInt((duration / 1000) % 60, 10);
    let minutes = parseInt((duration / (1000 * 60)) % 60, 10);
    let hours = parseInt((duration / (1000 * 60 * 60)) % 24, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  };

  render() {
    let playlistResults;
    playlistResults = this.props.playlist.map((item, i) => {
      return (
        <li key={i}>
          <SongDisplay
            title={item.title}
            artist={item.artist}
            image={item.image}
            bpm={item.bpm}
            time={item.time}
            key={i}
          />
        </li>
      );
    });

    let clearButton;
    let removeButton;
    let saveButton;
    if (playlistResults.length>1) {
      clearButton = (
        <div onClick={this.handleClear} className="playlist-button">
          Clear Playlist
        </div>
      );
      
      if (this.state.playlistSaved) {
        saveButton = ( <div>Saved to your Account!</div> )
        removeButton = (<div />)
      } else {
        saveButton = (
          <div>
            <div
              onClick={this.handleSave}
              className="save-playlist playlist-button"
            >
              Save Playlist to your account
            </div>
          </div>
        );
        removeButton = (
          <div onClick={this.props.removeLastSong} className="playlist-button">
            Remove last song
          </div>
        );
      }

    }

    let totalTime;
    totalTime = this.props.playlist.reduce(
      (sum, song) => sum + song.duration,
      0
    );
    totalTime = this.msToTime(totalTime);

    return (
      <div>
        <img src={playlist} alt=" " className="icon-white inner" />
        <h2 className="card-header inner">
          <strong>TOTAL TIME:</strong> {totalTime}
        </h2>
        <br />
        <ul>{playlistResults}</ul>
        {clearButton}
        {removeButton}
        {saveButton}
      </div>
    );
  }
}

export default Playlist;

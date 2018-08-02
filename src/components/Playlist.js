import React, { Component } from "react";
import SongDisplay from "./SongDisplay";
import "./Playlist.css";

class Playlist extends Component {
  render() {
    let playlistResults;
    playlistResults = this.props.playlist.map((item, i) => {
      // console.log(item);
      return (
        <li>
          "song"
          {/* <SongDisplay
            title={item.title}
            // artist={item.artist}
            // image={item.image}
            // id={item.id}
            // key={i}
          /> */}
        </li>
      );
    });

    return (
      <div>
        <h1>PlayList</h1>
        <div className="stats">
          <p> total time: {} </p>
        </div>
        <div className="songs-grid">
          <p> Songs go here </p>
          {playlistResults}
        </div>
      </div>
    );
  }
}

export default Playlist;

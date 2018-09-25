import React, { Component } from "react";
import axios from "axios";
import "./SongDetail.css";
import playlist from "../images/Icon_Playlist_Magenta.svg";
import dance from "../images/Icon_Dancing_Black.png";
import energy from "../images/Icon_Energy_Black.png";
import songTime from "../images/Icon_Time_Black.png";

class SongDetail extends Component {
  constructor() {
    super();
    this.state = {
      songData: []
    };
  }

  msToTime = duration => {
    // let milliseconds = parseInt((duration % 1000) / 100);
    let seconds = parseInt((duration / 1000) % 60);
    let minutes = parseInt((duration / (1000 * 60)) % 60);
    // minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds; // + "." + milliseconds;
  };

  componentDidMount() {
    let searchUrl;
    searchUrl = "https://api.spotify.com/v1/audio-features/" + this.props.id;
    let auth = "Bearer " + this.props.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: auth
      }
    };
    axios
      .get(searchUrl, config)
      .then(res => {
        // console.log(res.data);
        this.setState({
          songData: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidUpdate() {
    if (this.props.id !== this.state.songData.id) {
      let searchUrl;
      searchUrl = "https://api.spotify.com/v1/audio-features/" + this.props.id;
      let auth = "Bearer " + this.props.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: auth
        }
      };
      axios
        .get(searchUrl, config)
        .then(res => {
          // console.log(res.data);
          this.setState({
            songData: res.data
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  render() {
    const time = this.msToTime(this.state.songData.duration_ms);
    const bpm = Math.round(this.state.songData.tempo);
    return (
      <div className="details">
        <p>
          BPM:
          <div className="BPM">{bpm}</div>
        </p>
        <p>
          <img src={energy} alt="energy" /> <br />
          {this.state.songData.energy}
        </p>
        <p>
          <img src={dance} alt="dance" className="icon-black" /> <br />
          {this.state.songData.danceability}
        </p>
        <p>
          <img src={songTime} alt="time" /> <br />
          {time}
        </p>
        <img
          src={playlist}
          alt=" "
          className="add"
          onClick={() =>
            this.props.addToPlaylist({
              id: this.props.id,
              duration: this.state.songData.duration_ms,
              title: this.props.title,
              artist: this.props.artist,
              image: this.props.image,
              bpm: bpm,
              time: time
            })
          }
        />
      </div>
    );
  }
}

export default SongDetail;

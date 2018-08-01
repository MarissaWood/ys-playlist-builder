import React, { Component } from "react";
import axios from "axios";
import "./SongDetail.css";

class SongDetail extends Component {
  constructor() {
    super();
    this.state = {
      songData: []
    };
  }

  msToTime = duration => {
    let milliseconds = parseInt((duration % 1000) / 100);
    let seconds = parseInt((duration / 1000) % 60);
    let minutes = parseInt((duration / (1000 * 60)) % 60);
    // minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds + "." + milliseconds;
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
        console.log(res.data);
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
          console.log(res.data);
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
    return (
      <div className="details">
        <p>
          <strong>BPM:</strong> <br />
          {this.state.songData.tempo}
        </p>
        <p>
          <strong>Energy:</strong> <br />
          {this.state.songData.energy}
        </p>
        <p>
          <strong>Danceability:</strong> <br />
          {this.state.songData.danceability}
        </p>
        <p>
          <strong>Duration:</strong> <br />
          {time}
        </p>
      </div>
    );
  }
}

export default SongDetail;

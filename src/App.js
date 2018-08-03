import React, { Component } from "react";
import "./App.css";
import Search from "./components/Search";
import Playlist from "./components/Playlist";
// import { Link } from "react-router-dom"
import Guidelines from "./components/Guidelines";
import spotifylogo from "./images/spotifylogo.png";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      isLoggedIn: false,
      playlist: [],
      refreshToken: false,
      rightColumn: "playlist" //,
      // user_id: null
    };
  }

  componentDidMount() {
    let spotify_token = window.location.hash.substr(14, 195);
    this.setState({
      token: spotify_token
    });
  }

  handleOptionChange = e => {
    this.setState({ rightColumn: e.target.value });
  };

  addToPlaylist = song => {
    this.setState({
      playlist: [...this.state.playlist, song]
    });
  };

  clearPlaylist = e => {
    this.setState({ playlist: [] });
  };

  savePlaylist = e => {
    // get user id
    e.preventDefault();
    let auth = "Bearer " + this.state.token;
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: auth
      }
    };
    axios
      .get("https://api.spotify.com/v1/me", config)
      // create a new playlist
      .then(res => {
        console.log(res); // response from getting user_id
        let user_id = res.data.id;
        let url = "https://api.spotify.com/v1/users/" + user_id + "/playlists";
        axios({
          method: "post",
          url: url,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: auth
          },
          data: {
            name: "New YS Playlist",
            description: "playlist built with ys-playlist.surge.sh",
            public: "false"
          }
        })
          .then(res => {
            console.log(res); // response from creating the playlist
            // put together string of track uris
            let trackUris = "";
            for (let i = 0; i < this.state.playlist.length; i++) {
              if (i < this.state.playlist.length - 1) {
                trackUris += "spotify:track:" + this.state.playlist[i].id + ",";
              } else {
                trackUris += "spotify:track:" + this.state.playlist[i].id;
              }
            }
            // add songs to playlist
            let addSongUrl =
              "https://api.spotify.com/v1/users/" +
              user_id +
              "/playlists/" +
              res.data.id +
              "/tracks?uris=" +
              trackUris;
            return axios({
              method: "post",
              url: addSongUrl,
              headers: {
                "Content-Type": "application/json",
                Authorization: auth
              }
            })
              .then(res => console.log(res))
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const url =
      "https://accounts.spotify.com/authorize?client_id=" +
      process.env.REACT_APP_CLIENT_ID +
      "&client_secret=" +
      process.env.REACT_APP_CLIENT_SECRET +
      "&response_type=token&redirect_uri=http://ys-playlist.surge.sh";
    // "&response_type=token&redirect_uri=http://localhost:3000" +
    ("&scope=playlist-modify-private");

    let login;
    let message;

    if (!this.state.token) {
      login = (
        <a href={url} className="refresh">
          <button>Log in</button>
        </a>
      );
      message = (
        <p className="alert">
          Log in to Spotify to start building your playlist!
        </p>
      );
    } else {
      login = (
        <a href={url} className="refresh">
          Refresh token
        </a>
      );
      message = (
        <Search addToPlaylist={this.addToPlaylist} token={this.state.token} />
      );
    }

    let toggle;

    if (this.state.rightColumn === "playlist") {
      toggle = (
        <Playlist
          playlist={this.state.playlist}
          clearPlaylist={this.clearPlaylist}
          savePlaylist={this.savePlaylist}
        />
      );
    }
    if (this.state.rightColumn === "guidelines") {
      toggle = <Guidelines />;
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={spotifylogo} alt=" " className="logo" />
          <h1 className="App-title">Yoga Sculpt Playlist Building Tool</h1>
          {login}
        </header>
        <div className="main">
          {message}
          <div className="right-column">
            <form className="radio-buttons">
              <label>
                <input
                  type="radio"
                  name="right"
                  value="playlist"
                  onChange={this.handleOptionChange}
                  defaultChecked
                />
                Show Playlist
              </label>
              <label>
                <input
                  type="radio"
                  name="right"
                  value="guidelines"
                  onChange={this.handleOptionChange}
                />
                Show Section Guidelines
              </label>
            </form>
            {toggle}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

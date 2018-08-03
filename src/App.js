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
      // .then(res => {
      // // console.log(res.data.id);
      // this.setState({ user_id: res.data.id });
      // })
      // create a new playlist
      .then(res => {
        console.log(res);
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
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
    // add songs to playlist
    // .then(res => {
    //   let playlist_id = res.data.id
    //   let songs = this.state.map // get song ids
    //   //put song ids into uris
    //   let addUrl = "" + user_id + "" + playlist_id
    //   return axios.post(addUrl, config)
    // })
    // .then(res => console.log(res));
  };

  render() {
    const url =
      "https://accounts.spotify.com/authorize?client_id=" +
      process.env.REACT_APP_CLIENT_ID +
      "&client_secret=" +
      process.env.REACT_APP_CLIENT_SECRET +
      // "&response_type=token&redirect_uri=http://ys-playlist.surge.sh";
      "&response_type=token&redirect_uri=http://localhost:3000" +
      "&scope=playlist-modify-private";

    let login;
    let message;

    if (!this.state.token) {
      login = <a href={url}>Log in to Spotify to see song data</a>;
      message = (
        <p className="alert">
          Spotify requires an account access token to search their database.
          Click the link in the header to log in!
        </p>
      );
    } else {
      login = (
        <p>
          <a href={url}>Refresh</a> token
        </p>
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

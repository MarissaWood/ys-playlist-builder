import React, { Component } from "react";
import "./App.css";
import Search from "./components/Search";
import Playlist from "./components/Playlist";
// import { Link } from "react-router-dom"
import Guidelines from "./components/Guidelines";
import spotifylogo from "./images/spotifylogo.png";

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      isLoggedIn: false,
      playlist: [],
      refreshToken: false,
      rightColumn: "playlist"
    };
  }

  componentDidMount() {
    let spotify_token = window.location.hash.substr(14, 163);
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

  render() {
    const url =
      "https://accounts.spotify.com/authorize?client_id=" +
      process.env.REACT_APP_CLIENT_ID +
      "&client_secret=" +
      process.env.REACT_APP_CLIENT_SECRET +
      // "&response_type=token&redirect_uri=http://ys-playlist.surge.sh";
    "&response_type=token&redirect_uri=http://localhost:3000"
    + "&scope=playlist-modify-private";

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

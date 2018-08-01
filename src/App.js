import React, { Component } from "react";
import "./App.css";
import Search from "./components/Search";
// import Playlist from "./components/Playlist";
// import { Link } from "react-router-dom"
import Guidelines from "./components/Guidelines";
import spotifylogo from "./images/spotifylogo.png";

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      isLoggedIn: false,
      playlist: []
    };
  }

  componentDidMount() {
    let spotify_token = window.location.hash.substr(14, 163);
    this.setState({
      token: spotify_token
    });
  }

  addToPlaylist = () => {
    let newSong = "song";
    this.setState({
      playlist: [...this.state.playlist, newSong]
    });
  };

  render() {
    const url =
      "https://accounts.spotify.com/authorize?client_id=" +
      process.env.REACT_APP_CLIENT_ID +
      "&client_secret=" +
      process.env.REACT_APP_CLIENT_SECRET +
      "&response_type=token&redirect_uri=http://ys-playlist.surge.sh";
    // "&response_type=token&redirect_uri=http://localhost:3000";

    let login;

    if (!this.state.token) {
      login = <a href={url}>Log in to Spotify to see song data</a>;
    } else {
      login = (
        <p>
          <a href={url}>Refresh</a> token
        </p>
      );
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={spotifylogo} alt=" " className="logo" />
          <h1 className="App-title">Yoga Sculpt Playlist Building Tool</h1>
          {login}
        </header>
        <div className="main">
          <Search addToPlaylist={this.addToPlaylist} token={this.state.token} />
          {/* <Playlist list={this.state.playlist} /> */}
          <Guidelines />
        </div>
      </div>
    );
  }
}

export default App;

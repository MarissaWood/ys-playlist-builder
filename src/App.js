import React, { Component } from "react";
import "./App.css";
import Search from "./components/Search";
import Playlist from "./components/Playlist";
// import { Link } from "react-router-dom"

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
    let spotify_token = window.location.hash.substr(20, 169);
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

    let login;

    if (!this.state.token) {
      login = <a href={url}>Log in to Spotify to create playlists</a>;
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
          <img
            src="https://images-eu.ssl-images-amazon.com/images/I/51rttY7a%2B9L.png"
            alt=" "
            className="logo"
          />
          <h1 className="App-title">Yoga Sculpt Playlist Building Tool</h1>
          {login}
        </header>
        <div className="main">
          <Search addToPlaylist={this.addToPlaylist} />
          {/* <Playlist list={this.state.playlist} /> */}
        </div>
      </div>
    );
  }
}

export default App;

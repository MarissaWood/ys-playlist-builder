import React, { Component } from "react";
import "./App.css";
import Search from "./components/Search";
import Playlist from "./components/Playlist";
// import { Link } from "react-router-dom"

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      token: null
    };
  }

  componentDidMount() {
    let spotify_token = window.location.hash.substr(14, 163);
    this.setState({ token: spotify_token });
    if (this.state.token) {
      this.setState({ isLoggedIn: true });
    }
  }

  render() {
    const url =
      "https://accounts.spotify.com/authorize?client_id=" +
      process.env.REACT_APP_CLIENT_ID +
      "&client_secret=" +
      process.env.REACT_APP_CLIENT_SECRET +
      "&response_type=token&redirect_uri=http://localhost:3000";

    let login;

    if (!this.state.isLoggedIn) {
      login = <a href={url}>Log in to Spotify to create playlists</a>;
    } else {
      login = <p>You are logged in</p>;
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
          <Search />
          <Playlist />
        </div>
      </div>
    );
  }
}

export default App;

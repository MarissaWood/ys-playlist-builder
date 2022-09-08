import React, { Component } from "react";
import "./App.css";
import Search from "./components/Search";
import Playlist from "./components/Playlist";
import Guidelines from "./components/Guidelines";
import logo from "./images/Logo_Yog-Playlist.svg";
import searchPink from "./images/Icon_Search_Magenta.svg";
import guidesGreen from "./images/Icon_Guides_Green.svg";
import playlistBlue from "./images/Icon_Playlist_Blue.svg";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      isLoggedIn: false,
      playlist: [],
      refreshToken: false,
      tab: "playlist",
    };
  }

  componentDidMount() {
    const hash = window.location.hash.substring(1);
    const spotifyToken = hash.split("&")[0].split("=")[1];

    this.setState({
      token: spotifyToken,
    });
  }

  handleOptionChange = (e) => {
    this.setState({ rightColumn: e.target.value });
  };

  addToPlaylist = (song) => {
    this.setState({
      playlist: [...this.state.playlist, song],
    });
  };

  moveSongUp = (idx) => {
    let array = [...this.state.playlist];
    var song = array[idx];
    array[idx] = array[idx - 1];
    array[idx - 1] = song;
    this.setState({
      playlist: array,
    });
  };

  moveSongDown = (idx) => {
    let array = [...this.state.playlist];
    var song = array[idx];
    array[idx] = array[idx + 1];
    array[idx + 1] = song;
    this.setState({
      playlist: array,
    });
  };

  clearPlaylist = (e) => {
    this.setState({ playlist: [] });
  };

  removeLastSong = () => {
    let array = [...this.state.playlist];
    array.pop();
    this.setState({ playlist: array });
  };

  changeTab = (cardTab) => {
    this.setState({ tab: cardTab });
  };

  savePlaylist = (e) => {
    // get user id
    e.preventDefault();
    let auth = "Bearer " + this.state.token;
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: auth,
      },
    };
    axios
      .get("https://api.spotify.com/v1/me", config)
      // create a new playlist
      .then((res) => {
        console.log(res); // response from getting user_id
        let user_id = res.data.id;
        let url = "https://api.spotify.com/v1/users/" + user_id + "/playlists";
        axios({
          method: "post",
          url: url,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: auth,
          },
          data: {
            name: "New YS Playlist",
            description: "playlist built with yog-playlist.surge.sh",
            public: "false",
          },
        })
          .then((res) => {
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
                Authorization: auth,
              },
            })
              .then((res) => console.log(res))
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const url =
      "https://accounts.spotify.com/authorize?client_id=" +
      process.env.REACT_APP_CLIENT_ID +
      "&client_secret=" +
      process.env.REACT_APP_CLIENT_SECRET +
      "&response_type=token&redirect_uri=http://yog-playlist.surge.sh" +
      // "&response_type=token&redirect_uri=http://localhost:3000" +
      "&scope=playlist-modify-private";

    let login;
    let message;

    if (!this.state.token) {
      login = (
        <a href={url} className="login">
          Log in
        </a>
      );
      message = (
        <p className="alert">
          <a href={url} className="login">
            Log in
          </a>{" "}
          to Spotify to start building your playlist!
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

    let searchCard = <div className="search card">{message}</div>;
    let playlistCard = (
      <div className="playlist card">
        <Playlist
          playlist={this.state.playlist}
          clearPlaylist={this.clearPlaylist}
          removeLastSong={this.removeLastSong}
          savePlaylist={this.savePlaylist}
          moveSongUp={this.moveSongUp}
          moveSongDown={this.moveSongDown}
        />
      </div>
    );
    let guideCard = (
      <div className="guidelines card">
        <Guidelines />
      </div>
    );

    let cards;
    if (this.state.tab === "search") {
      cards = (
        <div className="main cards">
          {guideCard}
          {searchCard}
          {playlistCard}
          {guideCard}
        </div>
      );
    }

    if (this.state.tab === "playlist") {
      cards = (
        <div className="main cards">
          {searchCard}
          {playlistCard}
          {guideCard}
          {searchCard}
        </div>
      );
    }

    if (this.state.tab === "guide") {
      cards = (
        <div className="main cards">
          {playlistCard}
          {guideCard}
          {searchCard}
          {playlistCard}
        </div>
      );
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} alt=" " className="logo inner" />
          <h1 className="App-title inner">YOG-PLAYLIST</h1>
          <br />
          {login}
          <br />
          <div className="color-icons">
            <img
              src={searchPink}
              alt=" "
              className="icon-header"
              onClick={() => this.changeTab("search")}
            />
            <h3>SEARCH</h3>
          </div>
          <div className="color-icons">
            <img
              src={playlistBlue}
              alt=" "
              className="icon-header"
              onClick={() => this.changeTab("playlist")}
            />
            <h3>PLAYLIST</h3>
          </div>
          <div className="color-icons">
            <img
              src={guidesGreen}
              alt=" "
              className="icon-header"
              onClick={() => this.changeTab("guide")}
            />
            <h3>GUIDES</h3>
          </div>
        </header>
        {cards}
      </div>
    );
  }
}

export default App;

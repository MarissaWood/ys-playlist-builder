import React, { Component } from "react";
import SongPreview from "./SongPreview";
import axios from "axios";
import "./Search.css";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      mode: "track",
      searchResponse: [],
      token: ""
    };
  }

  componentDidMount() {
    // axios
    //   .get("https://accounts.spotify.com/api/token", {
    //     params: {
    //       client_id: process.env.REACT_APP_CLIENT_ID,
    //       response_type: "token",
    //       redirect_uri: "http://localhost:3000"
    //     }
    //   })
    //   .then(res => {
    //     console.log(res);
    //     this.setState({
    //       token: res.data.token
    //     });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    let spotify_token = window.location.hash.substr(14, 163);
    this.setState({ token: spotify_token });
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSearch = e => {
    e.preventDefault();
    let auth = "Bearer " + this.state.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: auth
      }
    };
    let searchUrl =
      "https://api.spotify.com/v1/search?q=" +
      this.state.query +
      "&type=" +
      this.state.mode +
      "&limit=10";
    axios
      .get(searchUrl, config)
      .then(res => {
        console.log(res.data);
        this.setState({
          searchResponse: res.data.tracks.items
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    let searchResults = this.state.searchResponse.map((item, i) => {
      // console.log(item);
      return (
        <li>
          <SongPreview
            title={item.name}
            artist={item.artists[0].name}
            image={item.album.images[2].url}
            id={item.id}
            key={i}
            token={this.state.token}
          />
        </li>
      );
    });

    return (
      <div>
        <h1>Search by: </h1>
        <form>
          <div className="radio-buttons">
            <div className="track">
              <input
                type="radio"
                name="mode"
                value="track"
                checked
                onChange={this.handleInput}
              />
              <label>Track</label>
            </div>
            <div className="artist">
              <input
                type="radio"
                name="mode"
                value="artist"
                onChange={this.handleInput}
              />
              <label>Artist</label>
            </div>
          </div>
          <div className="search-box">
            <input type="text" name="query" onChange={this.handleInput} />
            <input type="submit" value="Search" onClick={this.handleSearch} />
          </div>
        </form>
        <ul>{searchResults}</ul>
      </div>
    );
  }
}

export default Search;

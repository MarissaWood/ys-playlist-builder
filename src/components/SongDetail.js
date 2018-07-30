import React, { Component } from "react";
import axios from "axios";

class SongDetail extends Component {
  constructor() {
    super();
    this.state = {
      token: "",
      ApiData: []
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div className="details">
        <p>BPM: </p>
        <p>Energy: </p>
        <p>Danceability: </p>
      </div>
    );
  }
}

export default SongDetail;

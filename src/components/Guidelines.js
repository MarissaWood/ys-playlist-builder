import React, { Component } from "react";
import "./Guidelines.css";

class Guidelines extends Component {
  render() {
    return (
      <div className="guidelines">
        <h1>App Instructions</h1>
        <p>
          <strong>Search for a track</strong> to get data from Spotify. The song
          duration, BPM, Danceability score and Energy score can help you pick
          songs for the different sections of your yoga sculpt class.
          Danceability and Energy scores range for 0 - 1.0.
        </p>

        <h2>Section Guidelines</h2>
        <ul className="section-guidelines">
          <li>Integration (110-120 BPM)</li>
          <li>Sun A (110-120 BPM)</li>
          <li>Sun B (110-120 BPM)</li>
          <li>Push Ups/Biceps (115-125 BPM)</li>
          <li>Squat Series 1 (125-140 BPM)</li>
          <li>Cardio (125-160 BPM)</li>
          <li>Sculpt Series 1 (125-140 BPM)</li>
          <li>Sculpt Series 2 (125-140 BPM)</li>
          <li>Squat Series 2 (125-140 BPM)</li>
          <li>Glutes/Chest (115-125 BPM)</li>
          <li>Belly-up Core (125-140 BPM)</li>
          <li>Surrender Series (as slow as you wish)</li>
        </ul>
      </div>
    );
  }
}

export default Guidelines;

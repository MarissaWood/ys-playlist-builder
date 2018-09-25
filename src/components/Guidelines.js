import React, { Component } from "react";
import "./Guidelines.css";
import guidelines from "../images/Icon_Guides_White.svg";

class Guidelines extends Component {
  render() {
    return (
      <div className="Guidelines">
        <img src={guidelines} alt=" " className="icon-white inner" />
        <h2 className="card-header inner">SECTION GUIDELINES</h2>
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

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Faces from "./components/Faces";
import face from "./face.json";
import "./App.css";

//sets state to 0 or empty
class App extends Component {
  state = {
    face,
    chosenFace: [],
    score: 0
  };

  imageClick = event => {
    const currentFace = event.target.alt;
    const faceAlreadyChosen = this.state.chosenFace.indexOf(currentFace) > -1;

    if (faceAlreadyChosen) {
      this.setState({
        face: this.state.face.sort(function (a, b) {
          return 0.5 - Math.random();
        }),
        chosenFace: [],
        score: 0
      });
      alert("Missed... Play again?");

    } else {
      this.setState(
        {
          face: this.state.face.sort(function (a, b) {
            return 0.5 - Math.random();
          }),
          chosenFace: this.state.chosenFace.concat(
            currentFace
          ),
          score: this.state.score + 1
        },

        () => {
          if (this.state.score === 12) {
            alert("You Win!");
            this.setState({
              face: this.state.face.sort(function (a, b) {
                return 0.5 - Math.random();
              }),
              chosenFace: [],
              score: 0
            });
          }
        }
      );
    }
  };

  render() {
    return (
      <div>
        <Navbar
          score={this.state.score}
        />
        <Header />
        <div className="wrapper">
          {this.state.face.map(face => (
            <Faces
              imageClick={this.imageClick}
              id={face.id}
              key={face.id}
              image={face.image}
            />
          ))}
        </div>
      </div>
    );
  }
}
export default App;

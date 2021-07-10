import React, { Component } from "react";
import Particles from "react-particles-js";

class Canvas extends Component {
  state = { width: "0px", height: "0px" };
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }
  updateWindowDimensions = () => {
    this.setState({
      width: `${window.innerWidth}px`,
      height: `${window.innerHeight}px`
    });
  };
  render() {
    const { width, height } = this.state;
    return (
      <Particles
        {...this.state}
        params={{
          fpsLimit: 60,
          particles: {
            number: {
              value: 5,
              density: {
                enable: true,
                area: 800
              }
            },
            color: {
              value: "#fcfcfc"
            },
            shape: {
              type: "circle"
            },
            opacity: {
              value: 0.5,
              random: {
                enable: true,
                minimumValue: 0.1
              }
            },
            size: {
              value: 140,
              random: {
                enable: true,
                minimumValue: 40
              },
              animation: {
                enable: true,
                speed: 10,
                minimumValue: 40,
                sync: false
              }
            },
            move: {
              enable: true,
              speed: 8,
              direction: "none",
              random: false,
              straight: false,
              outModes: {
                default: "out"
              }
            }
          },
          interactivity: {
            detectsOn: "canvas",
            events: {
              resize: true
            }
          },
          detectRetina: true
        }}
      />
    );
  }
}
export default Canvas;

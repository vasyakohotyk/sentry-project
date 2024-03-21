import React, { Component } from "react";
import Popup from "./Popup";
import FormPopup from "./FormPopup";
import Home from "../index";
export class Steps extends Component {
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  render() {
    const { step } = this.state;

    // eslint-disable-next-line default-case
    switch (step) {
      case 1:
        return <Popup nextStep={this.nextStep} />;
      case 2:
        return <FormPopup prevStep={this.prevStep} nextStep={this.nextStep} />;
      case 3: 
        return <Home/>
    }
  }
}

export default Steps;

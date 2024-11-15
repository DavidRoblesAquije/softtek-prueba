import React from "react";
import "../styles/stepBar.scss";
import { iconbuttonarrow } from "../assets";

export const StepBar = ({ currentStep }) => {
  return (
    <>
      <div className="setpbar setpbar__desktop">
        <div className={`step ${currentStep === 1 ? "active" : ""}`}>
          <span className="step-number">1</span>
          <span className="step-label">Planes y coberturas</span>
        </div>

        <div className="separator">·····</div>

        <div className={`step ${currentStep === 2 ? "active" : ""}`}>
          <span className="step-number">2</span>
          <span className="step-label">Resumen</span>
        </div>
      </div>

      <div className="setpbar stepbar__responsive">
        <img src={iconbuttonarrow} alt="button" />
        <span className="step-info">PASO {currentStep} DE 2</span>
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: currentStep === 1 ? "50%" : "100%" }}
          ></div>
        </div>
      </div>
    </>
  );
};

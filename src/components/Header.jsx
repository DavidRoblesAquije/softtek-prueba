import React from "react";
import { iconphone, rimaclogored } from "../assets";
import "../styles/header.scss";

export const Header = () => {
  return (
    <header className="header">
      <div className="container d-flex justify-content-between">
        <div className="header__logo">
          <img src={rimaclogored} alt="rimac logo" />
        </div>
        <div className="header__contact">
          <p>¡Compra por este medio!</p>

          <div>
            <img src={iconphone} alt="phone" />
            <a href="#">(01) 411 6001</a>
          </div>
        </div>
      </div>
    </header>
  );
};

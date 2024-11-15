import React from "react";
import { rimaclogowhite } from "../assets";
import "../styles/footer.scss";

export const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-6">
            <div className="footer__logo">
              <img src={rimaclogowhite} alt="rimac logo" />
            </div>
          </div>
          <div className="col-12 col-sm-6">
            <div className="footer__info">
              <p>@2023 RIMAC Seguros y Reaseguros.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

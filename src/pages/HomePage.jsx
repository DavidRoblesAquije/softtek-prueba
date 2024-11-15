import React from "react";
import { Header } from "../components/Header";
import { iconphone, image, rimaclogored } from "../assets";
import "../styles/homepage.scss";
import { FormHome } from "../components/FormHome";
import { Footer } from "../components/Footer";
export const HomePage = () => {
  return (
    <section className="section__home">
      <Header />
      <div className="body__section">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <div className="body__image">
                <img src={image} alt="familia" />
              </div>
            </div>

            <div className="col-sm-12 col-md-6">
              <div className="body__form">
                <span>Seguro Salud Flexible</span>
                <h2>Creado para ti y tu familia</h2>
                <p>
                  Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe
                  nuestra asesoría. 100% online
                </p>

                <FormHome />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

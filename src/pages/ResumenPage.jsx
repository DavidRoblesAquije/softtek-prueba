import React, { useContext } from "react";
import { FormContext } from "../context/FormContext";
import { PlanContext } from "../context/PlanContext";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

import "../styles/resumepage.scss";
import { StepBar } from "../components/StepBar";
import { useNavigate } from "react-router-dom";
import { iconbackbutton, iconuser } from "../assets";

export const ResumenPage = () => {
  const { formData } = useContext(FormContext);
  const { selectedPlan } = useContext(PlanContext);
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate("/planes");
  };

  return (
    <section className="section__resume">
      <Header />
      <StepBar currentStep={2} />
      <main className="resumepage">
        <div className="container">
          <button onClick={handleReturn} className="btn resumepage__button">
            <img src={iconbackbutton} alt="icon" />
            Volver
          </button>

          <h2 className="resumepage__title">Resumen del seguro</h2>

          <div className="resumepage__card card">
            <div className="card-body">
              <div className="resumepage__card__user">
                <p>PRECIOS CALCULADOS PARA:</p>
                <div>
                  <img src={iconuser} alt="icon user" />
                  <p>{formData.username} {formData.userlastname}</p>
                </div>
              </div>

              <hr />

              <div className="resumepage__card__responsable">
                <p>Responsable de pago</p>
                <p>DNI: {formData.docNumber}</p>
                <p>Celular: {formData.celular}</p>
              </div>

              <div className="resumepage__card__planelegido">
                <p>Plan elegido</p>
                <p>{selectedPlan.planName}</p>
                <p>Costo del plan: ${selectedPlan.price} al mes</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </section>
  );
};

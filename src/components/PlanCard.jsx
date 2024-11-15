import React, { useContext } from "react";
import { iconhouse, iconhospital, iconadduser } from "../assets";
import { useNavigate } from "react-router-dom";
import { PlanContext } from "../context/PlanContext";

export const PlanCard = ({ plan, selectedOption }) => {
  const navigate = useNavigate();
  const { setSelectedPlan } = useContext(PlanContext);

  let icon = iconhouse;
  switch (plan.name) {
    case "Plan en Casa":
      icon = iconhouse;
      break;
    case "Plan en Casa y Clínica":
      icon = iconhospital;
      break;
    case "Plan en Casa + Chequeo ":
      icon = iconadduser;
      break;

    default:
      icon = iconhouse;
      break;
  }

  let price =
    selectedOption == "me" ? plan.price : (plan.price * 0.95).toFixed(2);

  const handlePlan = () => {
    setSelectedPlan({ planName: plan.name, price: price });
    navigate("/resumen");
  };

  return (
    <div className="card-body card__plan">
      <div className="card__header">
        <div className="card__type">
          <h3>{plan.name}</h3>
          <p>COSTO DEL PLAN</p>
          <strong>${price} al mes</strong>
        </div>
        <div className="card__icon">
          <img src={icon} alt="icon" />
        </div>
      </div>
      <hr />
      <ul>
        {plan.description.map((info, index) => (
          <li key={index}>{info}</li>
        ))}
      </ul>
      <button
        className="btn btn-primary card__plan__button"
        onClick={handlePlan}
      >
        Seleccionar Plan
      </button>
    </div>
  );
};

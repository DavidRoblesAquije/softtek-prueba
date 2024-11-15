import React from "react";
import { iconcheck } from "../assets";

export const OptionCard = ({
  icon,
  title,
  description,
  selected,
  onSelected,
}) => {
  
  return (
    <div
      className={`card card__option ${selected ? "selected" : ""}`}
      onClick={onSelected}
    >
      <div className="card-body">
        <div className="card__check">
          <img src={iconcheck} alt="check" />
        </div>
        <div className="card__icon__title">
          <img src={icon} alt="icon" />
          <h3>{title}</h3>
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
};

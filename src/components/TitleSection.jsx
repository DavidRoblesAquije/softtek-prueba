import React from "react";

export const TitleSection = ({ username }) => {
  return (
    <div className="title__section">
      <h2>{username}, ¿Para quién deseas cotizar?</h2>
      <p>Selecciona la opción que se ajuste más a tus necesidades.</p>
    </div>
  );
};

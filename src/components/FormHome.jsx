import { useContext, useState } from "react";
import { FormContext } from "../context/FormContext";
import { Navigate, useNavigate } from "react-router-dom";

export const FormHome = () => {
  const navigate = useNavigate();
  const { setFormData } = useContext(FormContext);

  const [docType, setDocType] = useState("DNI");
  const [docNumber, setDocNumber] = useState("");
  const [celular, setCelular] = useState("");
  const [politicaPrivacidad, setPoliticaPrivacidad] = useState(false);
  const [politicaComunica, setPoliticaComunica] = useState(false);

  const handleDocTypeChange = (e) => setDocType(e.target.value);

  const handleDocNumberChange = (e) => {
    const value = e.target.value;
    // Validación: solo números
    if (/^\d*$/.test(value)) {
      if (docType === "DNI" && value.length <= 8) {
        setDocNumber(value);
      } else if (docType === "Pasaporte" && value.length <= 20) {
        setDocNumber(value);
      }
    }
  };

  const handleCelularChange = (e) => {
    const value = e.target.value;
    // Validación: solo números y máximo 9 dígitos para celular
    if (/^\d*$/.test(value) && value.length <= 9) {
      setCelular(value);
    }
  };

  const handlePrivacyPolicyChange = () =>
    setPoliticaPrivacidad(!politicaPrivacidad);
  const handleCommercialPolicyChange = () =>
    setPoliticaComunica(!politicaComunica);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData((prevState) => ({
      ...prevState, // Copia todas las propiedades actuales
      docNumber: docNumber,
      celular : celular,
    }));
    navigate("/planes");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <div className="row">
          <div className="col-5 pr-0">
            <div className="form-group">
              <select
                id="docType"
                className="form-control"
                value={docType}
                onChange={handleDocTypeChange}
              >
                <option value="DNI">DNI</option>
                <option value="Pasaporte">Pasaporte</option>
              </select>
            </div>
          </div>
          <div className="col-7 pl-0">
            <div className="form-group">
              <input
                type="text"
                id="docNumber"
                className="form-control"
                value={docNumber}
                onChange={handleDocNumberChange}
                placeholder="Nro de documento"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <input
                type="text"
                id="celular"
                className="form-control"
                value={celular}
                onChange={handleCelularChange}
                placeholder="Celular"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="privacyPolicy"
                checked={politicaPrivacidad}
                onChange={handlePrivacyPolicyChange}
              />
              <label className="form-check-label" htmlFor="privacyPolicy">
                Acepto la Política de Privacidad
              </label>
            </div>
          </div>
          <div className="col-12">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="commercialPolicy"
                checked={politicaComunica}
                onChange={handleCommercialPolicyChange}
              />
              <label className="form-check-label" htmlFor="commercialPolicy">
                Acepto la Política Comunicaciones Comerciales
              </label>
            </div>
          </div>
        </div>

        <p className="terms">
          <a href="#">Aplican Términos y Condiciones.</a>
        </p>

        <button
          type="submit"
          disabled={
            !(
              politicaPrivacidad &&
              politicaComunica &&
              celular.length == 9 &&
              docNumber.length >= 8
            )
          }
        >
          Cotiza aquí
        </button>
      </form>
    </>
  );
};

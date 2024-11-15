import React, { useContext, useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FormContext } from "../context/FormContext";
import { StepBar } from "../components/StepBar";
import { TitleSection } from "../components/TitleSection";

import "../styles/planespage.scss";
import { OptionCard } from "../components/OptionCard";
import { iconadduser, iconbackbutton, iconprotection } from "../assets";
import { PlanLista } from "../components/PlanLista";
import { useNavigate } from "react-router-dom";

export const PlanesPage = () => {
  const { setFormData } = useContext(FormContext);

  const [user, setUser] = useState("");
  const [plans, setPlans] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const [error, setError] = useState(null);

  const [selectedOption, setSelectedOption] = useState(null);

  const navigate = useNavigate();

  const handleReturn = () => {
    navigate("/");
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const calcularEdad = (fecha) => {
    const fechanacimiento = new Date(fecha.split("-").reverse().join("-")); //FOrmato YYYY-MM-DD
    const fechaactual = new Date();
    let edad = fechaactual.getFullYear() - fechanacimiento.getFullYear();
    const mesesdiferencia = fechaactual.getMonth() - fechanacimiento.getMonth();
    //si el cumpleaños del año actual aun no ha ocurrido
    if (
      mesesdiferencia < 0 ||
      (mesesdiferencia === 0 &&
        fechaactual.getDate() < fechanacimiento.getDate())
    ) {
      edad--;
    }

    return edad;
  };

  useEffect(() => {
    //OBTENER DATOS DE USUARIO
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://rimac-front-end-challenge.netlify.app/api/user.json"
        );
        const data = await response.json();
        setUser(data);
        setLoading(false);

        setFormData((prevState) => ({
          ...prevState, // Copia todas las propiedades actuales
          username: data.name,
          userlastname: data.lastName,
        }));
      } catch (error) {
        setError("Error en obtencion de usuario");
        setLoadingPlans(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    //OBTENER PLANES UNA VEZ SE TIENE EL USUARIO
    const fetchPlanesData = async () => {
      try {
        setLoadingPlans(true);
        const response = await fetch(
          "https://rimac-front-end-challenge.netlify.app/api/plans.json"
        );
        const data = await response.json();

        //EDAD DEL USUARIO
        const userage = calcularEdad(user.birthDay);

        const filterdPans = data.list.filter((plan) => plan.age >= userage);
        setPlans(filterdPans);
        setLoadingPlans(false);
      } catch (error) {
        setError("Error en obtencion de planes");
        setLoadingPlans(false);
      }
    };

    if (user) fetchPlanesData();
  }, [user]);

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="section__planes">
      <Header />
      <StepBar currentStep={1} />
      <main className="planespage">
        <div className="container">
          <button onClick={handleReturn} className="btn resumepage__button">
            <img src={iconbackbutton} alt="icon" />
            Volver
          </button>

          <TitleSection key={user.name} username={user.name} />

          <div className="row">
            <div className="col-0 col-sm-1 col-md-1 col-lg-3"></div>
            <div className="col-12 col-sm-5 col-md-5 col-lg-3">
              <OptionCard
                icon={iconprotection}
                title={"Para mí"}
                description={
                  "Cotiza tu seguro de salud y agrega familiares si así lo deseas."
                }
                selected={selectedOption === "me"}
                onSelected={() => handleOptionSelect("me")}
              />
            </div>
            <div className="col-12 col-sm-5 col-md-5 col-lg-3">
              <OptionCard
                icon={iconadduser}
                title={"Para alguien más"}
                description={
                  "Realiza una cotización para uno de tus familiares o cualquier persona."
                }
                selected={selectedOption === "other"}
                onSelected={() => {
                  handleOptionSelect("other");
                }}
              />
            </div>
            <div className="col-0 col-sm-1 col-md-1 col-lg-3"></div>
          </div>

          {selectedOption && (
            <PlanLista plans={plans} selectedOption={selectedOption} />
          )}
        </div>
      </main>
      <Footer />
    </section>
  );
};

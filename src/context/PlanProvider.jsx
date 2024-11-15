import { useEffect, useState } from "react";
import { PlanContext } from "./PlanContext";

const initialstate = {
  planName: "",
  price: 0,
};

export const PlanProvider = ({ children }) => {
  const [selectedPlan, setSelectedPlan] = useState(() => {
    const savedData = localStorage.getItem("selectedPlan");
    return savedData ? JSON.parse(savedData) : initialstate;
  });

  useEffect(() => {
    localStorage.setItem("selectedPlan", JSON.stringify(selectedPlan));
  }, [selectedPlan]);

  return (
    <PlanContext.Provider value={{ selectedPlan, setSelectedPlan }}>
      {children}
    </PlanContext.Provider>
  );
};

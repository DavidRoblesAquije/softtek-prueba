import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage, PlanesPage, ResumenPage } from "./pages";
import { FormProvider } from "./context/FormProvider";
import { PlanProvider } from "./context/PlanProvider";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/planes",
      element: <PlanesPage />,
    },
    {
      path: "/resumen",
      element: <ResumenPage />,
    },
  ]);

  return (
    <FormProvider>
      <PlanProvider>
        <RouterProvider router={router} />
      </PlanProvider>
    </FormProvider>
  );
}

export default App;

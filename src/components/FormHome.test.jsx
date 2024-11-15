import { beforeEach, describe, expect, test, vi } from "vitest";
import { FormHome } from "./FormHome";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { FormContext } from "../context/FormContext";

// Mock de setFormData, puedes usar un mock function para pruebas
const setFormDataMock = vi.fn();
const navigateMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe("FormHome Component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <FormContext.Provider value={{ setFormData: setFormDataMock }}>
          <FormHome />
        </FormContext.Provider>
      </MemoryRouter>
    );
  });

  test("solo se aceptan numeros en los inputs", () => {
    const docNumerInput = screen.getByPlaceholderText("Nro de documento");
    const celularInput = screen.getByPlaceholderText("Celular");

    fireEvent.change(docNumerInput, { target: { value: "123" } });
    expect(docNumerInput.value).toBe("123");

    fireEvent.change(celularInput, { target: { value: "12345" } });
    expect(celularInput.value).toBe("12345");
  });

  test("los checbox deben estar habilitados para activar boton", () => {
    const privacyCheckbox = screen.getByLabelText(
      /Acepto la Política de Privacidad/i
    );
    const commercialCheckbox = screen.getByLabelText(
      /Acepto la Política Comunicaciones Comerciales/i
    );
    const submitButton = screen.getByText(/Cotiza aquí/i);

    //El boton al inicio no esta habilitado
    expect(submitButton).toBeDisabled();

    //se marcan las casillas y se llenan los inputs
    fireEvent.click(privacyCheckbox);
    fireEvent.click(commercialCheckbox);
    fireEvent.change(screen.getByPlaceholderText("Celular"), {
      target: { value: "123456789" },
    });
    fireEvent.change(screen.getByPlaceholderText("Nro de documento"), {
      target: { value: "12345678" },
    });

    //El boton ahora debe estar habilitado solo si todo esta correcto
    expect(submitButton).toBeEnabled();
  });

  test("al enviar el formulario se navega a la pagina planes", () => {
    // Llenar el formulario y habilitar el botón de envío
    fireEvent.change(screen.getByPlaceholderText("Celular"), {
      target: { value: "123456789" },
    });
    fireEvent.change(screen.getByPlaceholderText("Nro de documento"), {
      target: { value: "12345678" },
    });
    fireEvent.click(screen.getByLabelText(/Acepto la Política de Privacidad/i));
    fireEvent.click(
      screen.getByLabelText(/Acepto la Política Comunicaciones Comerciales/i)
    );
    //se envia el formulario
    fireEvent.click(screen.getByText(/Cotiza aquí/i));

    // Verificar que se ha llamado setFormData
    expect(setFormDataMock).toHaveBeenCalled();

    //recuperar la funcion pasada a setformdata
    const updateFunction = setFormDataMock.mock.calls[0][0];

    // Ejecuta la función simulando el estado previo
    const newState = updateFunction({
      docNumber: "",
      celular: "",
    });

    // Verifica que el nuevo estado tenga los valores esperados
    expect(newState).toMatchObject({
      docNumber: "12345678",
      celular: "123456789",
    });

    //navegar a PLanes
    expect(navigateMock).toHaveBeenCalledWith("/planes");
  });
});

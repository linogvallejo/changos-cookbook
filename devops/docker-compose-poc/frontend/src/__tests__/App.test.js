import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { within } from "@testing-library/react";
import App from "../App";

// mock route components
jest.mock("../components/usuarios-lista.component", () => () => (
  <div>Usuarios Page</div>
));
jest.mock("../components/agregar-usuario.component", () => () => (
  <div>Add Page</div>
));
jest.mock("../components/usuario.component", () => () => (
  <div>Usuario Page</div>
));

function renderWithRouter(ui, { route = "/" } = {}) {
  window.history.pushState({}, "Test page", route);
  return render(ui, { wrapper: Router });
}

describe("App", () => {
  test("renders App component", () => {
    renderWithRouter(<App />);
    expect(
      screen.getByText("Usuarios CRUD - Docker Compose PoC")
    ).toBeInTheDocument();
  });

  test('navigates to "/usuarios" when "Usuarios" link is clicked', async () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText("Usuarios"));
    expect(await screen.findByText("Usuarios Page")).toBeInTheDocument();
  });

  test('navigates to "/add" when "Agregar" link is clicked', async () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText("Agregar"));
    expect(await screen.findByText("Add Page")).toBeInTheDocument();
  });

  test("renders all routes", () => {
    renderWithRouter(<App />);
    const navbar = screen.getByRole("navigation");
    expect(within(navbar).getByText("Usuarios")).toBeInTheDocument();
    expect(within(navbar).getByText("Agregar")).toBeInTheDocument();
  });
});

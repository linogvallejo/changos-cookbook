import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UsuariosLista from "../usuarios-lista.component";
import usuarioDataService from "../../services/usuario.service";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";

// Mock the API service
jest.mock("../../services/usuario.service", () => ({
  getAll: jest.fn(() =>
    Promise.resolve({
      data: [
        { nombres: "John", apellidos: "Doe", email: "john@doe.com" },
        { nombres: "Jane", apellidos: "Doe", email: "jane@doe.com" },
      ],
    })
  ),
  findByNombre: jest.fn(() =>
    Promise.resolve({
      data: [{ nombres: "John", apellidos: "Doe", email: "john@doe.com" }],
    })
  ),
}));

jest.mock("axios");
axios.get = jest.fn();

describe("UsuariosLista", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", async () => {
    const { container } = render(<UsuariosLista />);
    expect(container).toBeInTheDocument();

    // Wait for one of the users to be loaded
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    // Assert that the second user is loaded after the first
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });

  test("displays user details when a user is clicked", async () => {
    const mockUser = [
      { nombres: "John", apellidos: "Doe", email: "john@doe.com" },
    ];
    axios.get.mockResolvedValueOnce({ data: mockUser });

    render(
      <Router>
        <UsuariosLista />
      </Router>
    );

    // Wait for users to be loaded
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    // Fire the click event
    fireEvent.click(screen.getByText("John Doe"));

    // Make sure the correct user details are displayed
    expect(screen.getByText("Nombres:")).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Apellidos:")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
    expect(screen.getByText("Correo electrónico:")).toBeInTheDocument();
    expect(screen.getByText("john@doe.com")).toBeInTheDocument();
  });

  it("searches for a user", async () => {
    usuarioDataService.findByNombre.mockResolvedValue({
      data: [{ nombres: "John", apellidos: "Doe", email: "john@doe.com" }],
    });

    render(<UsuariosLista />);
    const searchInput = screen.getByPlaceholderText(
      "Buscar por nombre de usuario"
    );
    const searchButton = screen.getByText("Buscar");

    fireEvent.change(searchInput, { target: { value: "John" } });
    fireEvent.click(searchButton);

    // findByText will wait until the element is found or until a timeout is reached
    const user = await screen.findByText("John Doe");
    expect(user).toBeInTheDocument();

    expect(usuarioDataService.findByNombre).toHaveBeenCalledWith("John");
  });

  // You could add more tests here to test functionalities like:
  // - Check if users are rendered in the list
  // - Clicking a user in the list sets that user as the active user
  // - If no user is selected, the appropriate placeholder text is displayed
  // - Clicking the "Editar" link navigates to the correct route
  // - etc.
});

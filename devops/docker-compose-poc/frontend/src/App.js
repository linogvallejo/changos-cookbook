import React, { Component } from "react";
import { Route, Link, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ElementWrapper from "./element-wrapper";
import routes from "./routes";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/usuarios" className="navbar-brand">
            Usuarios CRUD - Docker Compose PoC
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/usuarios"} className="nav-link">
                Usuarios
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Agregar
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Routes>
            {routes.map((route, ind) => {
              const { Component, ...Other } = route;
              return (
                <Route
                  {...Other}
                  key={`route-${ind}`}
                  element={<ElementWrapper {...{ Component }} />}
                />
              );
            })}
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;

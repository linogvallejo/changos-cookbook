import { Component } from "react";

import UsuarioDataService from "../services/usuario.service";
export default class Usuario extends Component {
  constructor(props) {
    super(props);
    this.onChangeNombres = this.onChangeNombres.bind(this);
    this.onChangeApellidos = this.onChangeApellidos.bind(this);
    this.onchangeEmail = this.onchangeEmail.bind(this);
    this.getUsuario = this.getUsuario.bind(this);
    this.actualizarUsuario = this.actualizarUsuario.bind(this);
    this.eliminarUsuario = this.eliminarUsuario.bind(this);
    this.state = {
      currentUsuario: {
        id: null,
        nombres: "",
        apellidos: "",
        email: "",
      },
      message: "",
    };
  }
  componentDidMount() {
    this.getUsuario(this.props.match.params.id);
  }
  onChangeNombres(e) {
    const nombres = e.target.value;
    this.setState(function (prevState) {
      return {
        currentUsuario: {
          ...prevState.currentUsuario,
          nombres: nombres,
        },
      };
    });
  }
  onChangeApellidos(e) {
    const apellidos = e.target.value;
    this.setState(function (prevState) {
      return {
        currentUsuario: {
          ...prevState.currentUsuario,
          apellidos: apellidos,
        },
      };
    });
  }

  onchangeEmail(e) {
    const email = e.target.value;

    this.setState((prevState) => ({
      currentUsuario: {
        ...prevState.currentUsuario,
        email: email,
      },
    }));
  }
  getUsuario(id) {
    UsuarioDataService.get(id)
      .then((response) => {
        this.setState({
          currentUsuario: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  actualizarUsuario() {
    UsuarioDataService.update(
      this.state.currentUsuario.id,
      this.state.currentUsuario
    )
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "El usuario fue actualizado exitosamente!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  eliminarUsuario() {
    UsuarioDataService.delete(this.state.currentUsuario.id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/usuarios");
      })
      .catch((e) => {
        console.log(e);
      });
  }
  render() {
    const { currentUsuario } = this.state;
    return (
      <div>
        {currentUsuario ? (
          <div className="edit-form">
            <h4>Usuario</h4>
            <form>
              <div className="form-group">
                <label htmlFor="nombres">Nombres</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombres"
                  value={currentUsuario.nombres}
                  onChange={this.onChangeNombres}
                />
              </div>
              <div className="form-group">
                <label htmlFor="apellidos">Apellidos</label>
                <input
                  type="text"
                  className="form-control"
                  id="apellidos"
                  value={currentUsuario.apellidos}
                  onChange={this.onChangeApellidos}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Correo electrónico</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={currentUsuario.email}
                  onChange={this.onchangeEmail}
                />
              </div>
            </form>
            <hr />
            <div>
              <button onClick={this.eliminarUsuario} class="btn btn-secondary">
                Eliminar
              </button>
              <button
                type="submit"
                onClick={this.actualizarUsuario}
                class="btn btn-primary"
              >
                Actualizar
              </button>
            </div>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Por favor haga click en un Usuario...</p>
          </div>
        )}
      </div>
    );
  }
}

import { Component } from "react";
import UsuarioDataService from "../services/usuario.service";
export default class AgregarUsuario extends Component {
  constructor(props) {
    super(props);
    this.onChangeNombres = this.onChangeNombres.bind(this);
    this.onChangeApellidos = this.onChangeApellidos.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.guardarUsuario = this.guardarUsuario.bind(this);
    this.nuevoUsuario = this.nuevoUsuario.bind(this);
    this.state = {
      id: null,
      nombres: "",
      apellidos: "",
      email: "",
    };
  }
  onChangeNombres(e) {
    this.setState({
      nombres: e.target.value,
    });
  }
  onChangeApellidos(e) {
    this.setState({
      apellidos: e.target.value,
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  guardarUsuario() {
    var data = {
      nombres: this.state.nombres,
      apellidos: this.state.apellidos,
      email: this.state.email,
    };
    UsuarioDataService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          nombres: response.data.nombres,
          apellidos: response.data.apellidos,
          email: response.data.email,
        });
        console.log(response.data);
        this.setState({
          message: "El usuario fue creado exitosamente!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  nuevoUsuario() {
    this.setState({
      id: null,
      nombres: "",
      apellidos: "",
      email: "",
    });
  }
  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>El Usuario fue creado exitosamente!</h4>
            <button className="btn btn-success" onClick={this.nuevoUsuario}>
              Agregar
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="nombres">Nombres</label>
              <input
                type="text"
                className="form-control"
                id="nombres"
                required
                value={this.state.nombres}
                onChange={this.onChangeNombres}
                name="nombres"
              />
            </div>
            <div className="form-group">
              <label htmlFor="apellidos">Apellidos</label>
              <input
                type="text"
                className="form-control"
                id="apellidos"
                required
                value={this.state.apellidos}
                onChange={this.onChangeApellidos}
                name="apellidos"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="text"
                className="form-control"
                id="email"
                required
                value={this.state.email}
                onChange={this.onChangeEmail}
                name="email"
              />
            </div>
            <hr />
            <button onClick={this.guardarUsuario} className="btn btn-primary">
              Guardar
            </button>
          </div>
        )}
      </div>
    );
  }
}

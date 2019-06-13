import React, { Component } from "react";

export class Login extends Component {
  state = {
    login: "",
    password: ""
  };

  handleInputChange = field => e => this.setState({ [field]: e.target.value });

  render() {
    const { login, password } = this.state;
    return (
      <div className="vw-100 vh-100 d-flex d-flex-row justify-content-center align-items-center">
        <div className="p-5 bg-primary rounded w-25">
          <form
            onSubmit={e => {
              e.preventDefault();
              this.props.handleLogin(this.state.login, this.state.password);
            }}
          >
            <div className="form-group">
              <label htmlFor="login">Логин</label>
              <input
                value={login}
                onChange={this.handleInputChange("login")}
                type="text"
                className="form-control"
                id="login"
                placeholder="Введите логин"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Пароль</label>
              <input
                value={password}
                onChange={this.handleInputChange("password")}
                type="password"
                className="form-control"
                id="password"
              />
            </div>
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;

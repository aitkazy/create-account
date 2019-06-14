import React, { Component, Fragment } from "react";

export class Login extends Component {
  state = {
    login: "",
    password: "",
    error: ""
  };

  validate = () => {};

  handleInputChange = field => e => this.setState({ [field]: e.target.value });

  onSubmit = e => {
    const { handleSubmit } = this.props;
    const { login, password } = this.state;
    e.preventDefault();
    handleSubmit(login, password);
  };

  render() {
    const { login, password } = this.state;
    const { isLoading, error } = this.props;
    return (
      <div className="vw-100 vh-100 d-flex d-flex-row justify-content-center align-items-center">
        <div className="p-5 bg-primary rounded w-25">
          <form onSubmit={this.onSubmit}>
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
              {!isLoading && "Войти"}
              {isLoading && (
                <Fragment>
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Загрузка
                </Fragment>
              )}
            </button>
          </form>
          {error && (
            <div class="alert alert-warning mt-3" role="alert">
              {error}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Login;

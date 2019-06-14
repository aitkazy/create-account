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
      <Fragment>
        <div className="p-5 bg-primary rounded w-25">
          <p className="h1 text-light">Email2Sms</p>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="login" className="text-light">
                Логин
              </label>
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
              <label htmlFor="password" className="text-light">
                Пароль
              </label>
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
            <div className="alert alert-warning mt-3" role="alert">
              {error}
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

export default Login;

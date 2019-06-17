import React, { Component, Fragment } from "react";

class Login extends Component {
  state = {
    login: "demo",
    password: "demo",
    error: false,
    requestingLogin: false,
    isLogged: false
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { isLoggedRef } = this.props;
    const { isLogged } = this.state;
    if (isLogged !== prevState.isLogged) {
      isLoggedRef(isLogged);
    }
  };

  handleInputChange = field => e => this.setState({ [field]: e.target.value });

  onSubmit = e => {
    const { handleSubmit } = this.props;
    const { login, password } = this.state;
    e.preventDefault();
    this.setState(
      { requestingLogin: true, error: false, isLogged: false },
      () =>
        handleSubmit(login, password)
          .then(data =>
            this.setState({ requestingLogin: false, isLogged: true })
          )
          .catch(error =>
            this.setState({ requestingLogin: false, isLogged: false, error })
          )
    );
  };

  render() {
    const { login, password, requestingLogin, error } = this.state;
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
            <button
              disabled={requestingLogin}
              type="submit"
              className="btn btn-dark"
            >
              {!requestingLogin && "Войти"}
              {requestingLogin && (
                <Fragment>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  />
                  {"   Загрузка"}
                </Fragment>
              )}
            </button>
          </form>
          {error && (
            <div className="alert alert-warning mt-3" role="alert">
              {error.message}
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

export default Login;

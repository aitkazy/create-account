import React, { Component, Fragment } from "react";

class Login extends Component {
  state = {
    login: "demo",
    password: "demo",
    error: false,
    requestingLogin: false
  };

  handleInputChange = field => e => this.setState({ [field]: e.target.value });

  simulateLoginRequest = () => {
    const { login, password } = this.state;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const isLogged = login === "demo" && password === "demo";
        if (isLogged) {
          resolve({ status: "OK" });
        } else {
          reject(new Error("Неправильный логин или пароль"));
        }
      }, 1000);
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({ requestingLogin: true, error: false }, () =>
      this.simulateLoginRequest()
        .catch(error => {
          console.log("error while sign in", error);
          throw new Error(
            "Ошибка авторизации. Обратитесь к администратору системы."
          );
        })
        .then(() => {
          this.setState({ requestingLogin: false });
          this.props.callback(true);
        })
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

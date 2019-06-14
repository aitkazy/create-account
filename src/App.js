import React, { Component } from "react";
import Login from "./Login";

const Test = () => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <a
          href="/"
          onClick={e => e.preventDefault()}
          className="btn btn-primary"
        >
          Go somewhere
        </a>
      </div>
    </div>
  );
};

const CreateAccount = () => {
  return <Test />;
};

class App extends Component {
  state = {
    isLoading: false,
    isLoaded: false,
    isLogged: false,
    login: "demo",
    password: "demo",
    error: ""
  };

  simulateLoginRequest = (formLogin, formPassword) => {
    const { login, password } = this.state;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const isLogged = login === formLogin && formPassword === password;
        if (isLogged) {
          resolve({ status: "OK" });
        } else {
          reject(new Error("Неправильный логин или пароль"));
        }
      }, 1000);
    });
  };

  handleLogin = (login, password) => {
    this.setState({
      isLoading: true,
      isLoaded: false,
      isLogged: false,
      error: ""
    });
    this.simulateLoginRequest(login, password)
      .then(data => {
        this.setState({
          isLogged: true,
          isLoaded: true,
          isLoading: false
        });
      })
      .catch(error =>
        this.setState({
          isLoaded: true,
          isLoading: false,
          isLogged: false,
          error: error.message
        })
      );
  };

  render() {
    const { isLogged, isLoading, isLoaded, error } = this.state;
    return (
      <div className="vw-100 vh-100 d-flex d-flex-row justify-content-center align-items-center">
        {isLogged && <CreateAccount />}
        {!isLogged && (
          <Login
            isLoading={isLoading}
            error={error}
            handleSubmit={this.handleLogin}
          />
        )}
      </div>
    );
  }
}

export default App;

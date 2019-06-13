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
  return (
    <div className="vw-100 vh-100 d-flex d-flex-row justify-content-center align-items-center">
      <Test />
    </div>
  );
};

class App extends Component {
  state = {
    isLogged: false,
    login: "demo",
    password: "demo",
    error: ""
  };

  handleLogin = (formLogin, formPassword) => {
    const { login, password } = this.state;
    const isLogged = login === formLogin && formPassword === password;
    this.setState({ isLogged });
  };

  render() {
    const { isLogged } = this.state;
    return (
      <div>
        {isLogged && <CreateAccount />}
        {!isLogged && <Login handleLogin={this.handleLogin} />}
      </div>
    );
  }
}

export default App;

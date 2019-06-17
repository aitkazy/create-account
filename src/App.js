import React, { Component } from "react";
import Login from "./Login";
import CreateAccount from "./CreateAccount";

class App extends Component {
  state = {
    isLogged: false,
    isAccountCreated: false,
    userLogin: "demo",
    userPassword: "demo"
  };

  handleLoggedRef = isLogged => this.setState({ isLogged });

  simulateLoginRequest = (formLogin, formPassword) => {
    const { userLogin, userPassword } = this.state;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const isLogged =
          userLogin === formLogin && formPassword === userPassword;
        if (isLogged) {
          resolve({ status: "OK" });
        } else {
          reject(new Error("Неправильный логин или пароль"));
        }
      }, 1000);
    });
  };

  simulateCreateAccountRequest = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // resolve({
        //   result: "ok",
        //   message: "Account created: 77774836986@mail2.bctu.tech"
        // });
        // resolve({
        //   result: "error",
        //   message:
        //     "Failed to save object. Another object with the same name already exists in this domain."
        // });
        reject();
      }, 2000);
    });
  };

  handleCreateAccountRef = isAccountCreated =>
    this.setState({ isAccountCreated });

  render() {
    const { isLogged, isAccountCreated } = this.state;
    return (
      <div className="vw-100 vh-100 d-flex d-flex-row justify-content-center align-items-center">
        {isLogged && (
          <CreateAccount handleSubmit={this.simulateCreateAccountRequest} />
        )}
        {!isLogged && (
          <Login
            handleSubmit={this.simulateLoginRequest}
            isLoggedRef={this.handleLoggedRef}
          />
        )}
      </div>
    );
  }
}

export default App;

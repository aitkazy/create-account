import React, { Component } from "react";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import axios from "axios";

class App extends Component {
  state = {
    isLoading: false,
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
    this.setState(
      {
        isLoading: true,
        isLogged: false,
        error: ""
      },
      () =>
        this.simulateLoginRequest(login, password)
          .then(data => {
            this.setState({
              isLogged: true,
              isLoading: false
            });
          })
          .catch(error =>
            this.setState({
              isLoading: false,
              isLogged: false,
              error: error.message
            })
          )
    );
  };

  createAccountRequest = phoneNumber => {
    const formData = new FormData();
    formData.set("phoneNumber", phoneNumber);
    // return axios({
    //   method: "post",
    //   url: "http://mail2.bctu.tech/api/createaccount",
    //   auth: {
    //     username: "DteApiUser",
    //     password: "hVta7B#"
    //   },
    //   data: {
    //     // phoneNumber: formData
    //     phoneNumber
    //   }
    // });
    return axios({
      url: "http://mail2.bctu.tech/api/createaccount",
      method: "post",
      transformRequest: obj => {
        let str = [];
        for (var prop in obj)
          if (obj.hasOwnProperty(prop)) {
            str.push(
              encodeURIComponent(prop) + "=" + encodeURIComponent(obj[prop])
            );
          }
        return str.join("&");
      },
      auth: {
        username: "DteApiUser",
        password: "hVta7B#"
      },
      data: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      }
    });
  };

  handleCreateAccount = phone => {
    this.createAccountRequest(phone)
      .then(data => console.log("success ca req", data))
      .catch(error => console.log("failed ca req", error));
  };

  render() {
    const { isLogged, isLoading, error } = this.state;
    return (
      <div className="vw-100 vh-100 d-flex d-flex-row justify-content-center align-items-center">
        {isLogged && <CreateAccount handleSubmit={this.handleCreateAccount} />}
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

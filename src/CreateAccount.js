import React, { Component, Fragment } from "react";
import request from "./tools/request";

export class CreateAccount extends Component {
  state = {
    phoneNumber: "",
    error: "",
    isCreatingAccount: false
  };

  handlePhoneNumberChange = e => {
    const phoneNumber = e.target.value.replace(/[^\d]/g, "");
    this.setState({ phoneNumber });
  };

  handleCreateAccountRequest = () => {
    const { phoneNumber } = this.state;
    return request.createAccount(phoneNumber);
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.validatePhoneNumber()) return;
    this.setState({ isCreatingAccount: true }, () => {
      this.handleCreateAccountRequest()
        .catch(responseError => {
          console.log("Response Error", responseError);
          throw new Error(
            "Ошибка создания аккаунта. Обратитесь к администратору системы."
          );
        })
        .then(response => {
          this.setState(
            {
              isCreatingAccount: false
            },
            () =>
              this.props.history.push({
                pathname: "/accountInfo",
                state: { response: response.data }
              })
          );
        })
        .catch(error => {
          this.setState({
            error: error.message,
            isCreatingAccount: false,
            isCreateAccReqFinished: false
          });
        });
    });
  };

  validatePhoneNumber = () => {
    const { phoneNumber } = this.state;
    const lengthError = phoneNumber.length !== 11;
    if (lengthError) {
      this.setState({
        error:
          "Длина номера телефона должна быть 11 символов. Пример, 7XXXYYYZZZZ."
      });
    }
    return lengthError;
  };

  render() {
    const { phoneNumber, error, isCreatingAccount } = this.state;
    return (
      <div className="p-5 bg-primary rounded text-light">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="phoneNumber">Номер телефона</label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              aria-describedby="phoneNumber"
              placeholder="Введите номер телефона"
              value={phoneNumber}
              onChange={this.handlePhoneNumberChange}
              onFocus={() => this.setState({ error: "" })}
            />
          </div>
          <button
            disabled={isCreatingAccount}
            type="submit"
            className="btn btn-dark btn-block"
          >
            {!isCreatingAccount && "Создать аккаунт"}
            {isCreatingAccount && (
              <Fragment>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
                {"   Создание аккаунта"}
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
    );
  }
}

export default CreateAccount;

// 77774836986@mail2.bctu.tech

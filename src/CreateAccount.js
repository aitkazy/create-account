import React, { Component, Fragment } from "react";

export class CreateAccount extends Component {
  state = {
    phoneNumber: "77774836984",
    error: "",
    isCreatingAccount: false,
    isCreateAccReqFinished: false,
    requestMessage: {}
  };

  handlePhoneNumberChange = e => {
    const phoneNumber = e.target.value.replace(/[^\d]/g, "");
    this.setState({ phoneNumber });
  };

  onSubmit = e => {
    const { handleSubmit } = this.props;
    const { phoneNumber } = this.state;
    e.preventDefault();
    if (this.validatePhoneNumber(phoneNumber)) return;
    this.setState({ isCreatingAccount: true, isAccountCreated: false }, () => {
      handleSubmit(phoneNumber)
        .catch(responseError => {
          console.log("Response Error", responseError);
          throw new Error(
            "Ошибка создания аккаунта. Обратитесь к администратору системы."
          );
        })
        .then(data => {
          this.setState({
            isCreatingAccount: false,
            isCreateAccReqFinished: true
          });
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

  validatePhoneNumber = phoneNumber => {
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
      <div className="p-5 bg-primary rounded w-25 text-light">
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
                Создание аккаунта
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

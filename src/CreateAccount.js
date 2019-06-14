import React, { Component } from "react";

export class CreateAccount extends Component {
  state = { phoneNumber: "", validationError: "" };

  handlePhoneNumberChange = e => {
    const phoneNumber = e.target.value.replace(/[^\d]/g, "");
    this.setState({ phoneNumber });
  };

  onSubmit = e => {
    const { handleSubmit } = this.props;
    const { phoneNumber } = this.state;
    e.preventDefault();
    if (this.validatePhoneNumber(phoneNumber)) return;
    handleSubmit(phoneNumber);
  };

  validatePhoneNumber = phoneNumber => {
    const lengthError = phoneNumber.length !== 11;
    if (lengthError) {
      this.setState({
        validationError: "Длина номера телефона должна быть 11 символов"
      });
    }
    return lengthError;
  };

  render() {
    const { phoneNumber, validationError } = this.state;
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
              onFocus={() => this.setState({ validationError: "" })}
            />
          </div>
          <button type="submit" class="btn btn-dark btn-block">
            Submit
          </button>
        </form>
        {validationError && (
          <div class="alert alert-warning mt-3" role="alert">
            {validationError}
          </div>
        )}
      </div>
    );
  }
}

export default CreateAccount;

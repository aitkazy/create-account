import React, { Component } from "react";

export class CreateAccount extends Component {
  state = { phoneNumber: "" };

  handlePhoneNumberChange = e => {
    const phoneNumber = e.target.value.replace(/[^\d]/g, "");
    this.setState({ phoneNumber });
  };

  render() {
    const { phoneNumber } = this.state;
    return (
      <div className="p-5 bg-primary rounded w-25 text-light">
        <form>
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
            />
          </div>
          <button type="submit" class="btn btn-dark btn-block">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default CreateAccount;

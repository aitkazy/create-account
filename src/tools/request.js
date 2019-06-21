import axios from "axios";

const request = (() => {
  const signIn = (login, password) => {};
  const createAccount = phoneNumber => {
    return axios({
      method: "post",
      url: "http://dtekzmt.bctu.tech/api/createaccount",
      auth: {
        username: "DteApiUser",
        password: "hVta7B#"
      },
      data: {
        phoneNumber
      }
    });
  };
  return {
    createAccount
  };
})();

export default request;

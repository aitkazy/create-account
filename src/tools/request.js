import axios from "axios";

const request = (() => {
  const signIn = (login, password) => {};
  const createAccount = phoneNumber => {
    const formData = new FormData();
    formData.set("phoneNumber", phoneNumber);

    return axios({
      method: "post",
      url: "http://dtekzmt.bctu.tech/api/createaccount",
      auth: {
        username: "DteApiUser",
        password: "hVta7B#"
      },
      headers: {
        "Content-Type": "multipart/form-data"
      },
      data: formData
    });
  };
  return {
    createAccount
  };
})();

export default request;

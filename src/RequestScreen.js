import React from "react";
import CopyToClipboard from "./CopyToClipboard";

const RequestScreen = props => {
  const data = props.location.state.response;
  const isOK = data.result === "ok";
  const goTo = () => props.history.push("/");

  if (isOK) {
    const email = data.message.match(
      /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi
    )[0];
    return (
      <div className="p-5 bg-primary text-light rounded">
        <p className="h5">{data.result}</p>
        <p className="h5">{data.message.split(":")[0]}</p>
        <CopyToClipboard text={email} />
        <br />
        <button onClick={goTo} type="button" className="btn btn-dark">
          Вернуться на главную
        </button>
      </div>
    );
  } else {
    return (
      <div className="p-5 bg-primary text-light rounded">
        <p className="h5">{data.result}</p>
        <p className="h5">{data.message}</p>
        <br />
        <button onClick={goTo} type="button" className="btn btn-dark">
          Вернуться на главную
        </button>
      </div>
    );
  }
};

export default RequestScreen;

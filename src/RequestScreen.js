import React from "react";

const RequestScreen = props => {
  const data = props.location.state.response;
  const goTo = () => props.history.push("/");

  return (
    <div className="p-5 bg-primary text-light rounded">
      <p className="h2">{data.result}</p>
      <p className="h5">{data.message}</p>
      <br />
      <button onClick={goTo} type="button" className="btn btn-dark">
        Вернуться на главную
      </button>
    </div>
  );
};

export default RequestScreen;

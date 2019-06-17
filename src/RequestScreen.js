import React from "react";

const RequestScreen = props => {
  const data = props.location.state.response;
  const goTo = () => props.history.push("/");

  return (
    <div>
      <div>
        <button onClick={goTo}>goTo</button>
      </div>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
};

export default RequestScreen;

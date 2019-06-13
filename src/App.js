import React from "react";

const Test = () => {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <a
          href="/"
          onClick={e => e.preventDefault()}
          className="btn btn-primary"
        >
          Go somewhere
        </a>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="vw-100 vh-100 d-flex d-flex-row justify-content-center align-items-center">
      <Test />
    </div>
  );
}

export default App;

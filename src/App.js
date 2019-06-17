import React, { Component } from "react";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import RequestScreen from "./RequestScreen";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

class App extends Component {
  state = {
    isLogged: false
  };

  handleLoggingIn = isLogged => this.setState({ isLogged });

  render() {
    const { isLogged } = this.state;
    return (
      <Router>
        <div className="vw-100 vh-100 d-flex d-flex-row justify-content-center align-items-center">
          <Route exact path="/" component={CreateAccount} />
          <Route path="/accountInfo" component={RequestScreen} />
          <Route
            path="/login"
            render={props => (
              <Login {...props} callback={this.handleLoggingIn} />
            )}
          />
          {isLogged ? <Redirect to="/" /> : <Redirect to="/login" />}
        </div>
      </Router>
    );
  }
}

export default App;

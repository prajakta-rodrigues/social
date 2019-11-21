import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import { Nav, Col, Row } from "react-bootstrap";
import { Provider, connect } from "react-redux";

import Login from "./components/login";
import SignUp from "./components/signup";
import store from "./store";

export default function init_page(root) {
  let tree = (
    <Provider store={store}>
      <Index />
    </Provider>
  );
  ReactDOM.render(tree, root);
}

function Index(props) {
  const header = (
    <Row>
      <div className="header-container">
        <Col xs={12}>
          <h1> Social </h1>
          <Session />
          <hr />
        </Col>
      </div>
    </Row>
  );

  return (
    <Router>
      {header}
      <br />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
      </Switch>
    </Router>
  );
}

let Session = connect(({ session }) => ({ session }))(
  ({ session, dispatch }) => {
    function logout(ev) {
      ev.preventDefault();
      localStorage.removeItem("session");
      dispatch({
        type: "LOG_OUT"
      });
    }

    if (session) {
      const userName = session.user_name;
      return (
        <div style={{ display: "inline-block", float: "right" }}>
          <Nav>
            <Nav.Item>
              <p className="text-dark py-2">
                {userName}
              </p>
            </Nav.Item>
            <Nav.Item>
              <a className="nav-link" href="#" onClick={logout}>
                Logout
              </a>
            </Nav.Item>
          </Nav>
        </div>
      );
    } else {
      return "";
    }
  }
);

import React from "react";
import ReactDOM from "react-dom";

import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { Provider } from "react-redux";

import Login from "./components/login";
import Insta_auth from './components/insta_auth'
import Navbar from './components/navbar'

import store from "./store";
import logo from '../static/logo.png'

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
          <img src={logo} alt="logo" />
          <hr />
        </Col>
      </div>
    </Row>
  );

  return (
    <Router>
      <Navbar />
      {header}
      <br />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/insta_auth" component={Insta_auth} />
      </Switch>
    </Router>
  );
}


import React from "react";
import { connect } from "react-redux";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Redirect } from "react-router";
import { submitLogin, post } from "../ajax";
import logo from "../../static/logo.png";
import store from "../store";
// import argon2 from 'argon2'

class Login extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    redirect: null
  };

  this.redirect = this.redirect.bind(this);
  }

  changed(data) {
  this.props.dispatch({
    type: "CHANGE_LOGIN",
    data: data
  });
  }

  redirect(path) {
  this.setState({
    redirect: path
  });
  }

  /**
   * To create/login user using fb.
   */
  continueWithFB() {
  // Get the status of the current user i.e. to see whether the user is logged
  // in or not.
  FB.getLoginStatus(response => {
    // If user is not already logged in then proceed.
    FB.login(
    response => {
      if (response.authResponse) {
      // Get the information about the user and login them to the app
      // using email
      FB.api("/me/", "get", { fields: ["email", "name"] }, resp => {
        // Set the session from the info obtained.

        // Check if the user exists on our database.
        let details = resp
        post("/user/get_with_token", {
          email: details.email,
          id: process.env.APP_ID
          }).then(resp => {
          // If user does not exist, then create a new one.
          if(!resp.user_id) {
            this.props.dispatch({
            type: "CHANGE_NEW_USER",
            data: {name: details.name, email: details.email}
            })
            FB.logout();
            this.redirect('/signup')
          } else {
            let email = details.email;
            let FB_ID = details.id;
            // If user exists, login them to our app and get a token from
            // the server.
            this.props.joinChannel(email);
            this.props.dispatch({
            type: "LOG_IN",
            data: { ...resp, FB_ID }
          });
          // Then redirect them to their dashboard.
          // THIS IS TEMP ROUTING.
          this.redirect("/profile"); 
        }
        });
      });
      }
    },
    {
      scope: ["email"],
      return_scopes: true
    }
    );
  });
  }

  submit_login(form) {
  this.props.joinChannel(form.props.email);
  submitLogin(form);
  }

  render() {
  if(store.getState().session.token)
    return <Redirect to="/home" />
    
  if (this.state.redirect) {
    return <Redirect to={this.state.redirect} />;
  }
  let { email, password, errors } = this.props;
  let error_msg = null;
  if (errors) {
    error_msg = (
    <Row>
      <Col xs={12}>
      <Alert variant="danger">{errors}</Alert>
      </Col>
    </Row>
    );
  }

  const header = (
    <Row>
    <div className="header-container">
      <Col xs={12}>
      <img src={logo} alt="logo" height="25%" width="25%" />
      </Col>
    </div>
    </Row>
  );
  const logInForm = (
    <div>
    {header}
    {error_msg}
    <Row>
      <Col xs={3} />
      <Col xs={6}>
      <div>
        <Form>
        <Form.Group as={Row} controlId="user-email">
          <Form.Label column sm={2}>
          Email
          </Form.Label>
          <Col sm={10}>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={ev => this.changed({ email: ev.target.value })}
          />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="user-password">
          <Form.Label column sm={2}>
          Password
          </Form.Label>
          <Col sm={10}>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={ev =>
            this.changed({ password: ev.target.value })
            }
          />
          </Col>
        </Form.Group>

        <div style={{ textAlign: "center" }}>
          <div
          className="btn btn-outline-social action-btn"
          onClick={() => this.submit_login(this)}
          >
          Login
          </div>
        </div>
        <div
          className="btn btn-outline-primary d-block mx-auto action-btn"
          onClick={() => this.continueWithFB()}
        >
          Continue with Facebook
        </div>
        </Form>
      </div>
      </Col>
      <Col xs={3} />
    </Row>
    </div>
  );

  return <div>{logInForm}</div>;
  }
}

function state2props(state) {
  return state.forms.login;
}

export default connect(state2props)(Login);

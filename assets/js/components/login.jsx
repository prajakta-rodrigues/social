import React from "react";
import { connect } from "react-redux";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Redirect } from "react-router";
import { submitLogin, get, post } from "../ajax";
import logo from '../../static/logo.png'
// import argon2 from 'argon2'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
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
    FB.getLoginStatus((response) => {
      // If user is not already logged in then proceed.
      if(response.status !== "connected") {
        FB.login((response) => {
          if(response.authResponse) {
            // Get the information about the user and login them to the app
            // using email
            FB.api('/me/', 'get', {fields: ['email','name']}, (resp) => {
              // Set the session from the info obtained.

              // Check if the user exists on our database.
              let email = resp.email
              this.props.joinChannel(email)
              post('/user/get_with_token', {email, id: process.env.APP_ID}).then((resp) => {
                console.log(resp)
                
                // If user exists, login them to our app and get a token from
                // the server.
                this.props.dispatch({
                  type: "LOG_IN",
                  data: resp
                })
                // Then redirect them to their dashboard.
                // THIS IS TEMP ROUTING.
                this.redirect('/profile')

                // Else create a password for the user.
              })

            })
          }
        }, {
          scope: ['email'], 
          return_scopes: true
        })
      }
    })    
  }

  render() {
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
            <h1> Social </h1>
            <img src={logo} alt="logo" />
            <hr />
          </Col>
        </div>
      </Row>
    );
    const logInForm = (
      <div>
        {header}
        <hr />
        {error_msg}
        <Row>
          <Col xs={2} />
          <Col xs={8}>
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
                    onChange={ev => this.changed({ password: ev.target.value })}
                  />
                </Col>
              </Form.Group>

              <div style={{ textAlign: 'center' }}>
                <div
                  className="btn btn-outline-success action-btn"
                  onClick={() => submitLogin(this)}
                >
                  Login
                </div>
              </div>
              <div
                  className="btn btn-primary d-block mx-auto action-btn"
                  onClick={() => this.continueWithFB()}
                >
                  Continue with Facebook
              </div>
            </Form>
          </Col>
          <Col xs={2} />
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

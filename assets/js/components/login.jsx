import React from "react";
import { connect } from "react-redux";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Redirect } from "react-router";
import { submit_login, get } from "../ajax";
import store from '../store'
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
    };
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
    FB.getLoginStatus((response) => {
      console.log(response)
      if(response.status !== "connected") {
        FB.login((response) => {
          console.log(response)
          if(response.authResponse) {
            // TODO: Redirect user to main page.

            FB.api('/me/', 'get', {fields: ['email','name']}, (resp) => {

              // Set the session from the info obtained.
              this.props.dispatch({
                type: "LOG_IN",
                data: resp
              })

              // Check if the user exists on our database.
              let email = store.getState().session.email

              get('/user/'+email).then((resp) => {
                console.log(resp)
                // If user exists, redirect them to home page.


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

    const logInForm = (
      <div>
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
                  onClick={() => submit_login(this)}
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

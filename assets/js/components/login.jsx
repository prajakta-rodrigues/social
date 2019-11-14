import React from "react";
import { connect } from "react-redux";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Redirect } from "react-router";

import { submit_login } from "../ajax";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null
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
                  className="btn btn-outline-success"
                  style={{
                    cursor: "pointer"
                  }}
                  onClick={() => submit_login(this)}
                >
                  Login
                </div>
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

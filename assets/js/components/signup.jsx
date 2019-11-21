import React from "react";
import { connect } from "react-redux";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Redirect } from "react-router";
import { newUser } from "../ajax";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null
    };
    this.redirect = this.redirect.bind(this);
  }

  changed(data) {
    this.props.dispatch({
      type: "CHANGE_NEW_USER",
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

    let { name, email, dob, username, password, errors } = this.props;
    let error_msg = null;
    if (errors) {
      error_msg = <Alert variant="danger">{errors}</Alert>;
    }

    const newUserForm = (
      <Row>
        {error_msg}
        <Col xs={2} />
        <Col xs={8}>
          <Form>
            <Form.Group as={Row} controlId="user-name">
              <Form.Label column sm={2}>
                Full Name
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Enter full name"
                  onChange={ev => this.changed({ name: ev.target.value })}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="user-email">
              <Form.Label column sm={2}>
                Email
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Enter your email"
                  onChange={ev => this.changed({ email: ev.target.value })}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="user-dob">
              <Form.Label column sm={2}>
                Date of Birth
              </Form.Label>
              <Col sm={10}>
                <input
                  type="date"
                  className="form-control"
                  value={dob}
                  onChange={ev => this.changed({ dob: ev.target.value })}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="user-username">
              <Form.Label column sm={2}>
                Username
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  onChange={ev => this.changed({ username: ev.target.value })}
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

            <div style={{ textAlign: "center" }}>
              <Button variant="outline-success" onClick={() => newUser(this)}>
                Sign Up
              </Button>
            </div>
          </Form>
        </Col>
        <Col xs={2} />
      </Row>
    );

    return (
      <div>
        <h3 style={{ textAlign: "center" }}>
          <span
            style={{
              color: "#515A5A"
            }}
          >
            Sign Up
          </span>
        </h3>
        <br />
        {newUserForm}
      </div>
    );
  }
}

function state2props(state) {
  return state.forms.new_user;
}

export default connect(state2props)(SignUp);

import React from "react";
import { connect } from "react-redux";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Redirect } from "react-router";
import { newUser } from "../ajax";

import logo from "../../static/logo.png";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      showAlert: true
    };
    this.redirect = this.redirect.bind(this);
    this.setAlertVisibility = this.setAlertVisibility.bind(this);
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

  setAlertVisibility(showAlert) {
    this.setState({
      showAlert
    });
  }

  file_changed(ev) {
    let img = ev.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(img)
    reader.addEventListener('load', () => {
        this.changed({profile_picture: reader.result})
    })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    let { name, email, dob, username, password, profile_picture, errors } = this.props;
    let error_msg = "";
    if (errors) {
      const { showAlert } = this.state;
      error_msg = showAlert ? (
        <Row style={{ textAlign: "center" }}>
          <Col xs={2} />
          <Col xs={8}>
            <Alert
              variant="danger"
              onClose={() => this.setAlertVisibility(false)}
              dismissible
            >
              {errors}
            </Alert>
          </Col>
          <Col xs={2} />
        </Row>
      ) : (
        ""
      );
    }

    const header = (
      <Row>
        <div className="header-container">
          <Col xs={12}>
            <img src={logo} alt="logo" height="15%" width="15%" />
          </Col>
        </div>
      </Row>
    );

    const newUserForm = (
      <Row>
        <Col xs={3} />
        <Col xs={6}>
          <Form>
            <Form.Group as={Row} controlId="user-name">
              <Form.Label column sm={2}>
                Full Name
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  value={name}
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
                  value={email}
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
                  value={username}
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
                  value={password}
                  placeholder="Password"
                  onChange={ev => this.changed({ password: ev.target.value })}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="user-picture">
              <Form.Label column sm={2}>
                Profile Picture
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="file"
                  placeholder="Profile Picture"
                  onChange={ev => this.file_changed(ev)}
                />
              </Col>
            </Form.Group>

            <div style={{ textAlign: "center" }}>
              <div
                className="btn btn-outline-social action-btn"
                onClick={() => newUser(this)}
              >
                Sign Up
              </div>
            </div>
          </Form>
        </Col>
        <Col xs={3} />
      </Row>
    );

    return (
      <div>
        {header}
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
        {error_msg}
        {newUserForm}
      </div>
    );
  }
}

function state2props(state) {
  return state.forms.new_user;
}

export default connect(state2props)(SignUp);

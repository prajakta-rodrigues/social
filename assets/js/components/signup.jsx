import React from "react";
import { connect } from "react-redux";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Redirect } from "react-router";
import { newUser } from "../ajax";

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
		})
	}

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    let { name, email, dob, username, password, errors } = this.props;
    let error_msg = "";
    if (errors) {
			const { showAlert } = this.state;
      error_msg = showAlert ? (
        <Row style={{ textAlign: "center" }}>
          <Col xs={2} />
          <Col xs={8}>
            <Alert variant="danger" onClose={() => this.setAlertVisibility(false)} dismissible>
              {errors}
            </Alert>
          </Col>
          <Col xs={2} />
        </Row>
      ) : "";
    }

    const newUserForm = (
      <Row>
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

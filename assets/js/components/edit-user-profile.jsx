import React from 'react';
import { connect } from 'react-redux';
import {Form, Button, Alert, Modal} from 'react-bootstrap';
import store from '../store'
import { post } from "../ajax";
import _ from 'lodash';

class EditUserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
    console.log(this.props);
    this.state = {
      redirect: null,
      show:false
    };
    let state = store.getState();
    this.session = state.session;

}

  changed(ev) {

  let target = $(ev.target);
  console.log(target.val());
  let data = {};
  data[target.attr('name')] = target.val();
  let action = {
    type: 'CHANGE_USER_PROFILE',
    data: data,
  };
  this.props.dispatch(action);
  }

  onSubmit() {
    let state = store.getState();
    let data = state.forms.user_profile;
    let session = state.session;
    console.log(session.user_id);
    let profile =  Object.assign({}, data, {user_id:session.user_id})
    post("/profiles", {profile: profile}).then(resp => {
      if (resp && resp.data) {
        store.dispatch({
          type: "NEW_USER_PROFILE",
          data: resp.data
        });
        console.log("Success");
        let stateCpy = _.cloneDeep(this.state);
        stateCpy.show = true;
        this.setState(stateCpy);
        store.dispatch({
          type: "CHANGE_USER_PROFILE",
          data: { errors: null }
        });
        // form.redirect("/login");
      } else {
        store.dispatch({
          type: "CHANGE_USER_PROFILE",
          data: { errors: JSON.stringify(resp.errors) }
        });
      }
    });

  }

  redirectToPersonality() {
    window
    .open('https://app.crystalknows.com/assessment?api_customer_id=12156111-3417-4c5d-91d5-953c82641103&api_company_name=Northeastern%20University&api_user_email=' + this.session.email,
    'Personality Test', 'width=600, height=400');
  }

  closeAlert() {
    store.dispatch({
      type: "CHANGE_USER_PROFILE",
      data: { errors: null }
    });
  }

  handleClose() {
    let stateCpy = _.cloneDeep(this.state);
    stateCpy.show = false;
    this.setState(stateCpy);
  }

    render() {
      let alerts = [];
      if (this.props.errors) {
        console.log(this.props.errors);
        alerts.push(<Alert variant="danger" key="alert-error" onClose={() => this.closeAlert.bind(this)} dismissible>
          {this.props.errors}
        </Alert>)
      }

      return (
        <div className="container-fluid">
          <h1>Edit User Profile</h1>
          {alerts}
          <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
            <Modal.Header closeButton>
              <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>Your profile was updated</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={this.handleClose.bind(this)}>
                Ok
              </Button>
            </Modal.Footer>
          </Modal>
          <Form>
            <Form.Group controlId="profileForm.request_setting_allow">
                <Form.Label>Who can send you requests:</Form.Label>
                <Form.Control as="select" value = {this.props.request_setting_allow}
                name="request_setting_allow" onChange={this.changed.bind(this)}>
                  <option></option>
                  <option>Everyone</option>
                  <option>Friends of Friends</option>
                </Form.Control>
              </Form.Group>
                <Form.Group controlId="profileForm.interests">
                  <Form.Label>Mention your interests:(eg.: dancing, singing)</Form.Label>
                  <Form.Control as="textarea" rows="3" placeholder="Enter your interests"
                  name="interests" value = {this.props.interests}
                  onChange={this.changed.bind(this)}/>
                </Form.Group>
                <Form.Group controlId="profileForm.description">
                  <Form.Label>Describe yourself in few words:</Form.Label>
                  <Form.Control as="textarea" rows="3" value = {this.props.description}
                  name="description" onChange={this.changed.bind(this)}/>
                </Form.Group>
                <a target="popup"
                  onClick = {this.redirectToPersonality.bind(this)}
                  alt="Take Personality Test"
                  href={"https://app.crystalknows.com/assessment?api_customer_id=12156111-3417-4c5d-91d5-953c82641103&api_company_name=Northeastern%20University&api_user_email=" + this.session.email}><img height="32" width="185" src= "https://cdn2.hubspot.net/hubfs/1716276/API/take_personality_test.png" /></a>
                <Button variant="primary" onClick={this.onSubmit.bind(this)}>Save</Button>
          </Form>
        </div>
    );
    }
}

function state2props(state) {
  return state.forms.user_profile;
}

export default connect(state2props)(EditUserProfile);

import React from 'react';
import { connect } from 'react-redux';
import {Form, Button, Alert, Modal} from 'react-bootstrap';
import store from '../store'
import { post, getUserProfile, patch, getConfigs } from "../ajax";
import _ from 'lodash';

function createSelectItems(property_values) {
  let items = [];
     for (let i = 0; i <= property_values.length; i++) {
          items.push(<option key={i}
            value={property_values[i]}>{property_values[i]}</option>);
     }
     return items;
}

function changedSelect(ev) {
  console.log(ev.target.id);
  let options = ev.target.options;
  var value = [];
  for (var i = 0; i < options.length; i++) {
    if (options[i].selected) {
      value.push(options[i].value);
    }
  }
  console.log(value);
  let data = {};
  data[ev.target.id] = value;
  let action = {
    type: 'CHANGE_USER_PROFILE',
    data: data,
  };
  store.dispatch(action);
}

let Config = connect(({configs, forms}) =>
({configs, forms}))(({configs, forms, dispatch}) =>{
  console.log("in", configs);
  let config = []
  configs.forEach((tt) => {
    config.push(<Form.Group key={"formgrp" + tt.id}>
      <Form.Label>Select {tt.property}</Form.Label>
      <Form.Control id = {tt.property} as="select" multiple
        onChange={(ev) => changedSelect(ev)} value={forms.user_profile[tt.property]}>
        {createSelectItems(tt.property_values)}
      </Form.Control>
    </Form.Group>)
});
  return <div>{config}</div>;
});



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
    getUserProfile();
    getConfigs();

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
    console.log("just checking here");
    console.log(data);
    let session = state.session;
    console.log(session.user_id);

    if(data.id) {
      let profile =  Object.assign({}, data, {user_id:session.user_id})
      patch("/profiles/"+ data.id, {profile: profile}).then(resp => {
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
    else {
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
                <Form.Group controlId="profileForm.description">
                  <Form.Label>Describe yourself in few words:</Form.Label>
                  <Form.Control as="textarea" rows="3" value = {this.props.description}
                  name="description" onChange={this.changed.bind(this)}/>
                </Form.Group>
                <Config />
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

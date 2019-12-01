import React from 'react';
import { connect } from 'react-redux';
import {Form, Button, Alert, Modal} from 'react-bootstrap';
import store from '../store'
import { post, getUserProfile, patch, getConfigs } from "../ajax";
import _ from 'lodash';

function createSelectItems(property_values, property) {
  let items = [];
  let selectedProperties = store.getState().forms.user_profile[property]
  property_values.forEach((val, index) => {
      items.push(
        <div 
            className={"tag " + (selectedProperties.includes(val) ? "selected" : "")} 
            key={index}
            onClick={(ev) => changedSelect(ev, property)}
            >
          {val}
        </div>
      );
  });
  return items;
}

function changedSelect(ev, property) {
  // console.log(ev.target.innerHTML);
  let value = ev.target.innerHTML
  let data = {}
  let interests = store.getState().forms.user_profile[property]
  if(interests.includes(value)) {
    data[property] = interests.filter(interest => {
      if(interest !== value)
        return interest
    })    
  } else {
    data[property] = [...interests, value]
  }
  // let options = ev.target.options;
  // var value = [];
  // for (var i = 0; i < options.length; i++) {
  //   if (options[i].selected) {
  //     value.push(options[i].value);
  //   }
  // }
  // let data = {};
  // data["interests"] = value;
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
    if (tt && tt.property == 'interests') {
      config.push(
        <div key={"formgrp" + tt.id} className="interests-container">
          Select {tt.property}
          <div className="tags-interests">
            {createSelectItems(tt.property_values, tt.property)}
          </div>
        </div>)
    } else {
      config.push(
        <div key={"formgrp" + tt.id} className="interests-container">
          Select {tt.property}
          <div className="tags">
            {createSelectItems(tt.property_values, tt.property)}
          </div>
        </div>)
    }
});
  return <div>{config}</div>;
});



class EditUserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
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
    let data = {};
  
    if(ev.target.classList.contains("tag")) {
      Array.from(ev.target.parentNode.children).forEach(child => {
        child.classList.remove("selected")
      })
      ev.target.classList.add("selected")
      let val = ev.target.getAttribute("value")
      let key = ev.target.getAttribute("name")
      data[key] = val
    }
    else {
      let target = $(ev.target);
      data[target.attr('name')] = target.val();
    }
    
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
            <Modal.Body>Your profile was successfully updated!</Modal.Body>
            <Modal.Footer>
              <Button variant="outline-dark" onClick={this.handleClose.bind(this)}>
                Okay
              </Button>
            </Modal.Footer>
          </Modal>
          <Form>
            <Form.Group controlId="profileForm.request_setting_allow">
                <Form.Label>Who can send you requests:</Form.Label>
                <div className="tags">
                  <div className={"tag " + (this.props.request_setting_allow === "Everyone" ? 'selected' : '')} name="request_setting_allow" onClick={this.changed.bind(this)} value="Everyone">Anyone</div>
                  <div className={"tag " + (this.props.request_setting_allow === "Friends of Friends" ? 'selected' : '')} name="request_setting_allow" onClick={this.changed.bind(this)} value="Friends of Friends">Friends of Friends</div>
                </div>
                {/* <Form.Control as="select" value = {this.props.request_setting_allow}
                name="request_setting_allow" onChange={this.changed.bind(this)}>
                  <option></option>
                  <option>Everyone</option>
                  <option>Friends of Friends</option>
                </Form.Control> */}
              </Form.Group>
                <Form.Group controlId="profileForm.description">
                  <Form.Label>Describe yourself in few words:</Form.Label>
                  <Form.Control as="textarea" rows="3" value ={this.props.description}
                  name="description" onChange={this.changed.bind(this)}/>
                </Form.Group>
                <Config />
                <div style={{ textAlign: 'center', marginTop: '1em' }}>
                  <Button variant="dark" onClick={this.onSubmit.bind(this)}>Save Changes</Button>
                </div>
          </Form>
        </div>
    );
    }
}

function state2props(state) {
  return state.forms.user_profile;
}

export default connect(state2props)(EditUserProfile);

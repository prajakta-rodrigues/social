import React from 'react';
import { connect } from 'react-redux';
import {Form, Button} from 'react-bootstrap';


class EditUserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
    };
  }

  redirectToPersonality() {
    window
    .open('https://app.crystalknows.com/assessment?api_customer_id=12156111-3417-4c5d-91d5-953c82641103&api_company_name=Northeastern%20University&api_user_email=' + 'prajaktarodrigues@gmail.com',
    'Personality Test', 'width=600, height=400');
  }


    render() {
      return (
        <div className="container-fluid">
          <h1>Edit User Profile</h1>
          <Form>
            <Form.Group controlId="profileForm.requestPrivacy">
                <Form.Label>Who can send you requests:</Form.Label>
                <Form.Control as="select">
                  <option>Everyone</option>
                  <option>Friends of Friends</option>
                </Form.Control>
              </Form.Group>
                <Form.Group controlId="profileForm.interests">
                  <Form.Label>Mention your interests:(eg.: dancing, singing)</Form.Label>
                  <Form.Control as="textarea" rows="3" />
                </Form.Group>
                <Form.Group controlId="exampleForm.about">
                  <Form.Label>Describe yourself in few words:</Form.Label>
                  <Form.Control as="textarea" rows="3" />
                </Form.Group>
                <a target="popup"
                  onClick = {this.redirectToPersonality.bind(this)} alt="Take Personality Test" href={"https://app.crystalknows.com/assessment?api_customer_id=12156111-3417-4c5d-91d5-953c82641103&api_company_name=Northeastern%20University&api_user_email=" + "prajaktarodrigues@gmail.com"}><img height="32" width="185" src= "https://cdn2.hubspot.net/hubfs/1716276/API/take_personality_test.png" /></a>
                <Button variant="primary">Save</Button>
          </Form>
        </div>
    );
    }
}

export default EditUserProfile;

import React from 'react';
import { connect } from 'react-redux';
import store from '../store';
import {Card, Button} from 'react-bootstrap';
import _ from 'lodash';

class RecommendedUsers extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      redirect: null,
      users: [{user_id: 1, email: "test@test.com", "name": "Ryan Renolds"},
              {user_id: 2, email: "brad@test.com", "name": "Brad Pitt"},
              {user_id: 3, email: "rini@test.com", "name": "Rini Rini"}]
    };

    let state = store.getState();
    this.session = state.session;

  }

  sendRequest(ev) {
    console.log(ev.target.value);
  }


  render() {
    let recommendedUsers = [];

    this.state.users.forEach((user) => {
      console.log(user);
      recommendedUsers.push(<Card key={"card" + user.user_id}>
        <Card.Body  key={"body" + user.user_id}>
          <Card.Title key={"title" + user.user_id}>
              {user.name}
          </Card.Title>
          <Card.Text key={"text" + user.user_id}>
            <Button key={"btn" + user.user_id} value={user.user_id} variant="primary" onClick={this.sendRequest.bind(this)}>Send Request</Button>
          </Card.Text>
        </Card.Body>
      </Card>)
    });


    return (
      <div className="container-fluid">
        <h1>Recommended Users for you:</h1>
        {recommendedUsers}
      </div>

  );
  }


}

export default RecommendedUsers;

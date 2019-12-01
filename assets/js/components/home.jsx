import React from "react";
import { Row, Col } from "react-bootstrap";
import Card from "./card";
import Chat from './chat';
import { connect } from 'react-redux';
import RecommendedUsers from './recommended-users'
import PopularInterests from './popular-interests'
import FriendsComponent from './friendsComponent'

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="container-fluid home-container">
				<Row>
					<Col sm={4}>
						<Card title="Popular Interests">
							<PopularInterests />
						</Card>
					</Col>
					<Col sm={4}>
						<Card title="Recommended Users">
							<RecommendedUsers />
						</Card>
					</Col>
					<Col xs={4}>
						<Card title="Chat" style={{ borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }}>
							<FriendsComponent action={"start chat"}/>
						</Card>
					</Col>
				</Row>
      </div>
    );
  }
}

function stateToProps(state) {
	return state;
  }

export default connect(stateToProps)(Home)

import React from "react";
import { Row, Col } from "react-bootstrap";
import Card from "./card";
import Chat from './chat';
import { connect } from 'react-redux';
import RecommendedUsers from './recommended-users'
import PopularInterests from './popular-interests'

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
					<Col sm={4}>
						<Card title="Chat">
							{/* ADD CHAT COMPONENT HERE */}
							<Row>
								<Col xs={4}>
									Friend list here
								</Col>
								<Col xs={6}>
									Active chats here
								</Col>
							</Row>
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

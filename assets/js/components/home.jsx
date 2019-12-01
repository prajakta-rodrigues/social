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
      <div style={{ marginLeft: '1.8em' }}>
        <Row>
          <Col xs={12} style={{ textAlign: 'center', padding: "1em" }}>
            <h1>
              Home
            </h1>
          </Col>
        </Row>
				<Row>
					<Col xs={4}>
						<Card title="Popular Interests">
							<PopularInterests />
						</Card>
					</Col>
					<Col xs={4}>
						<Card title="Recommended Users">
							<RecommendedUsers />
						</Card>
					</Col>
					<Col xs={4}>
						<Card title="Chat" style={{ borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }}>
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

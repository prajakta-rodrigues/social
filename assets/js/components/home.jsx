import React from "react";
import { Row, Col } from "react-bootstrap";
import Card from "./card";

export default class Home extends React.Component {
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
							ADD POPULAR INTERESTS HERE
						</Card>
					</Col>
					<Col xs={4}>
						<Card title="Recommended Users">
							ADD RECOMMENDED USERS HERE
						</Card>
					</Col>
					<Col xs={4}>
						<Card title="Chat" style={{ borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }}>
							ADD CHAT COMPONENT HERE
						</Card>
					</Col>
				</Row>
      </div>
    );
  }
}

import React from 'react';
import {connect} from 'react-redux';
import { listRequests } from '../ajax';
import { Link } from 'react-router-dom';
import { Button, Row } from 'react-bootstrap';
import { changeRequest } from "../ajax";

class Requests extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            requests: []
        }
        listRequests(this.props.session.user_id);
    }

    
    render() {
        let request = [];
        const { requests } = this.props;
        requests.map((req, index) => {
            request.push(
                <div className="rec-user-card" key={index}>
                    <Row>
                        <div className="name" style={{ paddingLeft: '1em'}}>
                            <Link to={"/user-profile/" + req.request_id}>{req.name}</Link>
                        </div>
                        <Button style={{ marginLeft: '3em'}} variant="none" className="btn btn-outline-social" onClick={() => changeRequest(req.request_id, "ACCEPTED")}>Accept</Button>
                        <Button style={{ marginLeft: '3em'}} variant="outline-dark" onClick={() => changeRequest(req.request_id, "REJECTED")}>Reject</Button>
                    </Row>
                </div>
            );
        });


        return(
            <div className="container">
                <Row style={{ paddingTop: '1em' }}>
                    <div className="header"><h2>My Requests</h2></div>
                </Row>
                {requests.length > 0 ? request : <p style={{ color: "gray", textAlign: 'center', marginTop: '20%' }}> <i> No Requests Available </i> </p>}
            </div>
        );
    }
}

function stateToProps(state) {
    return state;
}

export default connect(stateToProps)(Requests);

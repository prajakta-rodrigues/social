import React from 'react';
import {connect} from 'react-redux';
import { listRequests } from '../ajax';
import { Button } from 'react-bootstrap';
import { changeRequest } from "../ajax";

class Requests extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            requests: []
        }
        console.log("user_id", this.props.session.user_id);
        listRequests(this.props.session.user_id);
    }

    
    render() {

        let request = [];
        this.props.requests.map((req) => {
            request.push(<div className="row" key={req.id}>
            {req.name}
            <div className="col">
                <Button onClick={() => changeRequest(req.request_id, "ACCEPTED")}>Accept</Button></div>
            <div className="col">
                <Button onClick={() => changeRequest(req.request_id, "REJECTED")}>Reject</Button>
            </div>
        </div>);
        });
        console.log("res",request);

        return(<div className="container">
            <div className="header"><h2>My Requests</h2></div>
            {request}
        </div>);
    }
}

function stateToProps(state) {
    return state;
}

export default connect(stateToProps)(Requests);

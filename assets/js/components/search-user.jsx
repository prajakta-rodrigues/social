import React from "react";
import { connect } from 'react-redux';
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import { searchUsers } from "../ajax";


let Result = connect(({searchresults, session}) =>
({searchresults, session}))(({searchresults, session, dispatch}) =>{
  console.log("in", searchresults);
  let results = [];

  searchresults.forEach((tt) => {
    results.push(<div key={"row" + tt.id} className="row"><p key={"ele" + tt.id}>{tt.name}</p></div>)
});
  return <div className="container-fluid search-results">
    {results}
  </div>;
});


class SearchUser extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
    console.log(this.props);
    this.state = {
      redirect: null,
      show:false
    };
  }

  changed(data) {
    this.props.dispatch({
      type: "CHANGE_SEARCH",
      data: data
    });
    console.log(data);
    if(data.text == "") {
      this.props.dispatch({
        type: "CLEAR_RESULTS",
        data: data
      });
    }
    else {
      searchUsers();
    }

  }

  render() {
    return (
      <div>
          <Form>
          <Form.Group as={Row} controlId="user-email">
            <Form.Label column className="seach-title" sm={2}>
            Search
            </Form.Label>
            <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Enter name here"
              value={this.props.text}
              onChange={ev => this.changed({ text: ev.target.value })}
            />
            </Col>
          </Form.Group>
        </Form>
        <Result />
      </div>

            );
  }


}


function state2propssearch(state) {
  return state.forms.search;
}


export default connect(state2propssearch)(SearchUser);

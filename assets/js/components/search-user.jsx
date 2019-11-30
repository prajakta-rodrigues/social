import React from "react";
import { connect } from 'react-redux';
import { Row, Col, Form, Button, Alert, InputGroup } from "react-bootstrap";
import { searchUsers } from "../ajax";
import { Link } from 'react-router-dom';

// Icon made by https://www.flaticon.com/authors/freepik from www.flaticon.com
import searchLogo from '../../static/search-logo.png'



let Result = connect(({searchresults, session}) =>
({searchresults, session}))(({searchresults, session, dispatch}) =>{
  console.log("in", searchresults);
  let results = [];

  searchresults.forEach((tt) => {
    results.push(<div key={"row" + tt.id} className="row p-3 search-row">
    <Link to="#" key={"ele" + tt.id}>
    {tt.name}</Link></div>)
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
        <div className="search">
          <Form.Control
              className="search-input"
              type="text"
              placeholder="Enter name here"
              value={this.props.text}
              onChange={ev => this.changed({ text: ev.target.value })}
            />
          <div className="search-logo">
            <img src={searchLogo} alt="search-logo" /> 
          </div>
        </div>
        <Result />
      </div>

            );
  }


}


function state2propssearch(state) {
  return state.forms.search;
}


export default connect(state2propssearch)(SearchUser);

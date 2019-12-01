import React from "react";
import { connect } from 'react-redux';
import { Row, Col, Form, Button, Alert, InputGroup } from "react-bootstrap";
import { searchUsers } from "../ajax";
import { Link } from 'react-router-dom';
import store from '../store';
import { Redirect } from 'react-router';



// Icon made by https://www.flaticon.com/authors/freepik from www.flaticon.com
import searchLogo from '../../static/search-logo.png'


class SearchUser extends React.Component {



  constructor(props) {
    super(props);
    this.props = props;
    console.log(this.props);
    this.state = {
      redirect: null
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

  userClicked(id) {
    console.log("just checking user clicked", id);
    store.dispatch({
      type: "CHANGE_SEARCH",
      data: ""
    });
      store.dispatch({
        type: "CLEAR_RESULTS",
        data: ""
      });
  }


  render() {

    let Result = connect(({searchresults, session}) =>
    ({searchresults, session}))(({searchresults, session, dispatch}) =>{
      console.log("in", searchresults);
      let results = [];

      searchresults.forEach((tt) => {
        results.push(<div key={"row" + tt.id} className="row p-3 search-row">
        <Link to={"/user-profile/" + tt.id}
          onClick={() => this.userClicked(tt.id)} key={"ele" + tt.id}>
        {tt.name}</Link></div>)
    });
      return <div className="container-fluid search-results">
        {results}
      </div>;
    });


    return (
      <div>
        <div className="search">
          <div className="seach-box">
            <Form.Control
                className="search-input"
                type="text"
                placeholder="Enter name here"
                value={this.props.text}
                onChange={ev => this.changed({ text: ev.target.value })}
              />
          </div>

          <div className="search-logo">
            <img src={searchLogo} alt="search-logo" />
          </div>
        </div>
        <Result current={this}/>
      </div>

            );
  }


}


function state2propssearch(state) {
  return state.forms.search;
}


export default connect(state2propssearch)(SearchUser);

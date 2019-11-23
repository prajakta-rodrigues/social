import React from 'react';
import { connect } from 'react-redux';
import store from '../store';
import {Card, Button} from 'react-bootstrap';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import {get_recommended_users} from "../ajax";


export default function RecommendedUsers(params){

  return <Req />;

}

let flag = 0;

let Req = connect(({recommendedUsers, session}) => ({recommendedUsers, session}))(({recommendedUsers, session, dispatch}) =>{
  console.log("in", recommendedUsers);
  let recommend = [];
  if(flag == 0){
    get_recommended_users();
    flag = 1;
  }
  recommendedUsers.forEach((tt) => {
    recommend.push(<Recommend key={tt.id} id= {tt.id} name={tt.name} session={session}/>)
});
  return <div className="container-fluid">
    {recommend}
  </div>;
});

function sendRequest(ev) {
  console.log(ev.target.value);
}

function Recommend(params){
  let name = params.name;
  let session = params.session;
  let id = params.id;


  return <Card key={"card" + id}>
        <Card.Body  key={"body" + id}>
          <Card.Title key={"title" + id}>
            <Link to="#" >
            {name}</Link>

          </Card.Title>
          <Card.Text key={"text" + id}>
            <Button key={"btn" + id} value={id} variant="primary"
              onClick={sendRequest} >Send Request</Button>
          </Card.Text>
        </Card.Body>
      </Card>;
}

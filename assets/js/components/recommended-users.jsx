import React from 'react';
import { connect } from 'react-redux';
import store from '../store';
import {Card, Button} from 'react-bootstrap';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import {get_recommended_users, updateUserLocation} from "../ajax";


export default function RecommendedUsers(params){
  if (navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(savePosition);
   } else {
     console.log("Geolocation is not supported by this browser.");
   }
  return <Req />;

}

let flag = 0;

let Req = connect(({recommendedUsers, session}) =>
({recommendedUsers, session}))(({recommendedUsers, session, dispatch}) =>{
  console.log("in", recommendedUsers);
  let recommend = [];
  if(flag == 0){
    get_recommended_users();
    flag = 1;
  }

  recommendedUsers.forEach((tt) => {
    recommend.push(<Recommend key={tt.id} id= {tt.id} name={tt.name} session={session}/>)
});
  if(recommend.length == 0) {
    recommend.push(<h2 key="nodatarec">No recommendations available</h2>)
  }
  return <div className="container-fluid">
    {recommend}
  </div>;
});

function sendRequest(ev) {
  console.log(ev.target.value);
  store.dispatch({
    type: "REQUEST_SENT",
    data: ev.target.value
  });
}


function savePosition(position) {
  let session = store.getState().session;
  console.log("sess", session.longitude);
  console.log("poss", position.coords.longitude);
  if(session.longitude!= position.coords.longitude
    || session.latitude!= position.coords.latitude ) {
        updateUserLocation(position.coords.longitude, position.coords.latitude);
    }

}


function Recommend(params){
  let name = params.name;
  let session = params.session;
  let id = params.id;


  return <Card key={"card" + id} className="margin-bottom">
        <Card.Body  key={"body" + id}>
          <Card.Title key={"title" + id}>
            <Link to={"/user-profile/" + id} >
            {name}</Link>

          </Card.Title>
          <Card.Text key={"text" + id}>
            <Button key={"btn" + id} value={id} variant="primary"
              onClick={sendRequest} >Send Request</Button>
          </Card.Text>
        </Card.Body>
      </Card>;
}

import React from 'react';
import { connect } from 'react-redux';
import store from '../store';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import {get_recommended_users, updateUserLocation, sendRequest} from "../ajax";
import placeholder from '../../static/placeholder.svg'

// This image is provided by www.flaticon.com
import addFriendLogo from '../../static/add-friend-logo.svg'

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
    recommend.push(<Recommend key={tt.id} id= {tt.id} name={tt.name} session={session} dp={tt.profile_picture}/>)
});
  if(recommend.length == 0) {
    recommend.push(<h2 key="nodatarec">No recommendations available</h2>)
  }
  return <div className="recommended-users-container">
    {recommend}
  </div>;
});

function sendRequestUser(id1, id2) {
  console.log(id1, id2);
  // console.log(ev.target.value);
  store.dispatch({
    type: "REQUEST_SENT",
    data: id2
  });
  sendRequest(id1, id2)
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
  let dp = params.dp

  dp = dp ? dp : placeholder

  return (
    <div className="rec-user-card">
      <div className="rec-user-dp">
        <img src={dp} alt="dp" />
      </div>
      <div className="name">
        <Link to={"/user-profile/" + id}>{name}</Link>
      </div>
      <button  className="req-btn" onClick={() => {sendRequestUser(session.id, id)}}>
        <img src={addFriendLogo} alt="add-friend-logo" className="img-fluid" />
      </button>
    </div>
  );
}

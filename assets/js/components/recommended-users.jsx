import React from 'react';
import { connect } from 'react-redux';
import store from '../store';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import {get_recommended_users, updateUserLocation, sendRequest} from "../ajax";
import placeholder from '../../static/placeholder.svg'
import Spinner from '../components/spinner'

// This image is provided by www.flaticon.com
import addFriendLogo from '../../static/add-friend-logo.svg'



 class RecommendedUsers extends React.Component {

   constructor(props) {
     super(props);
     this.props = props;
     this.state = {
       redirect: null,
       data: []
     };
     if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(savePosition);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
       get_recommended_users();

   }


   render() {

     return (<div><Req /></div>);
   }



}


let Req = connect(({recommendedUsers, session}) =>
({recommendedUsers, session}))(({recommendedUsers, session, dispatch}) =>{
  let recommend = [];

  recommendedUsers.forEach((tt) => {
    recommend.push(<Recommend key={tt.id} id= {tt.id} name={tt.name}
      session={session} dp={tt.profile_picture}/>)
});
  if(recommend.length == 0) {
    recommend.push(<Spinner />)
  }
  return <div className="recommended-users-container" id="scroll">
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
      <button  className="req-btn" onClick={() => {sendRequestUser(id, session.user_id)}}>
        <img src={addFriendLogo} alt="add-friend-logo" className="img-fluid" />
      </button>
    </div>
  );
}

export default RecommendedUsers;

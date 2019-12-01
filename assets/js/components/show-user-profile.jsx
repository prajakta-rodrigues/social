import React from 'react';
import Posts from './insta_posts'
import { connect } from 'react-redux';
import store from '../store'
import { getUserShowProfileById } from "../ajax";
import { Tabs, Tab } from 'react-bootstrap'
import placeholder from '../../static/placeholder.svg'

class ShowUserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
    console.log(this.props.match.params.id);
    console.log("in show user profile");
    this.state = {
      redirect: null
    };
  }

  render() {
    getUserShowProfileById(this.props.match.params.id);
    return (
      <Profile />
    );
  }

}

let Profile = connect(({showUserProfile}) =>
({showUserProfile}))(({showUserProfile, dispatch}) =>{
  console.log("in", showUserProfile);
  let profile = [];
  let interests = "";
  let sports = "";
  let movies = "";

  if(showUserProfile) {
    if(showUserProfile.interests) {
      interests = showUserProfile.interests.toString();
    }
    if(showUserProfile.sports) {
      sports = showUserProfile.sports.toString();
    }
    if(showUserProfile.movies) {
      movies = showUserProfile.movies.toString();
    }

    let dp = showUserProfile.profile_picture
    dp = dp ? dp : placeholder

    profile.push(
      <div id="user-profile">
        <div className="header row profile">
          <div className="col-sm-4 contact">
            <img src={dp} alt="profile_picture"/>
            <div className="info">
              <span>{showUserProfile.name}</span>
            </div>
            <div className="info">
              <span>{showUserProfile.email}</span>
            </div>
          </div>
          <div className="col-sm-8 detail">
            <div className="info">
              About me: {showUserProfile.description}
            </div>
            <div className="info">
              Date Of Birth: {showUserProfile.dob}
            </div>
            <div className="info">
              Interests: {interests}
            </div>
            <div className="infor">
              Sports: {sports}
            </div>
            <div className="info">
              Movies: {movies}
            </div>
          </div>
        </div>
      </div>


      );

  }



  return <div className="container-fluid">
    {profile}
  </div>;
});


export default ShowUserProfile;

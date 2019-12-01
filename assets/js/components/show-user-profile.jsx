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
      <div id="user-profile" className="container">
        <div className="header">
          <div className="dp">
            <img src={dp} alt="profile_picture"/>
          </div>
          <div className="details">
            <h4>{showUserProfile.name}</h4>
            <h5>Friends: 330</h5>
          </div>
        </div>
        <Tabs defaultActiveKey="profile">
          <Tab eventKey="profile" title="Profile">
            <div className="container">
              <div className="row word-wrap">
                <div className="padding border col-md-6 col-sm-6 col-xs-6">About me:</div>
                <div className="padding border col-md-6 col-sm-6 col-xs-6">{showUserProfile.description}</div>
              </div>
              <div className="row">
                <div className="padding border col-md-6 col-sm-6 col-xs-6">Date of Birth:</div>
                <div className="padding border col-md-6 col-sm-6 col-xs-6">{showUserProfile.dob}</div>
              </div>
              <div className="row">
                <div className="padding border col-md-6 col-sm-6 col-xs-6">Email:</div>
                <div className="padding border col-md-6 col-sm-6 col-xs-6">{showUserProfile.email}</div>
              </div>
              <div className="row word-wrap">
                <div className="padding border col-md-6 col-sm-6 col-xs-6">Interests:</div>
                <div className="padding border col-md-6 col-sm-6 col-xs-6">{interests}</div>
              </div>
              <div className="row word-wrap">
                <div className="padding border col-md-6 col-sm-6 col-xs-6">Sports interested in:</div>
                <div className="padding border col-md-6 col-sm-6 col-xs-6">{sports}</div>
              </div>
              <div className="row word-wrap">
                <div className="padding border col-md-6 col-sm-6 col-xs-6">Movies interested in:</div>
                <div className="padding border col-md-6 col-sm-6 col-xs-6">{movies}</div>
              </div>
          </div>
          </Tab>
          <Tab eventKey="posts" title="IG Posts">
            <Posts />
          </Tab>
        </Tabs>
      </div>


      );

  }



  return <div className="container center-align">
    {profile}
  </div>;
});


export default ShowUserProfile;

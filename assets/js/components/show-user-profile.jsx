import React from 'react';
import { connect } from 'react-redux';
import { getUserShowProfileById } from "../ajax";
import placeholder from '../../static/placeholder.svg'

class ShowUserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      redirect: null,
    };
  }

  render() {
    let id = this.props.computedMatch.params.id
    getUserShowProfileById(id);
    return (
      <Profile />
    );
  }

}

let Profile = connect(({showUserProfile}) =>
({showUserProfile}))(({showUserProfile, dispatch}) =>{
  let profile = [];
  let interests = "";
  let sports = "";
  let movies = "";
  let posts = [];

  if(showUserProfile) {
    if(showUserProfile.interests) {
      interests = showUserProfile.interests.map(interest => {
        return(
          <div className="tag selected">{interest}</div>
        )
      })
    }
    if(showUserProfile.sports) {
      sports = showUserProfile.sports.map(sport => {
        return(
          <div className="tag selected">{sport}</div>
        )
      });
    }
    if(showUserProfile.movies) {
      movies = showUserProfile.movies.map(movie => {
        return(
          <div className="tag selected">{movie}</div>
        )
      });
    }

    if(showUserProfile.posts.length > 0) {
      posts = showUserProfile.posts.map(post => {
        return(
          <div key={post.id} className="ig_post">
              <img src={post.media_url} alt={post.id} className="post-img img-fluid" />
          </div>
        )
      })
    }

    let dp = showUserProfile.profile_picture
    dp = dp ? dp : placeholder

    let noPost = (
      <div className="ig-placeholder-container">
        <div className="connect-ig"><h3>This user has not linked their Instagram account.</h3></div>
      </div>
    )

    profile.push(
      <div id="friend-profile" className="container">
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
          <div className="col-sm-8">
            <div className="profile-details">
              <div className="row">
                <div className="col-sm-6">
                  <div className="info">
                    <div className="key">About me</div>
                    <div className="value">{showUserProfile.description}</div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="info">
                    <div className="key">
                      Date Of Birth
                    </div>
                    <div className="value">
                      {showUserProfile.dob}
                    </div>
                  </div>
                </div>
              </div>
              <div className="info">
                <div className="key">
                  Interests 
                </div>
                <div className="tags">
                  {interests}
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="info">
                    <div className="key">Sports</div>
                    <div className="tags">
                      {sports}
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="info">
                    <div className="key">Movies</div>
                    <div className="tags">
                      {movies}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ig-post-container">
          <h2 className="insta-header">Instagram Posts</h2>
          {posts.length > 0 ? <div className="posts">{posts}</div> : noPost}
          
        </div>
      </div>
      );

  }



  return <div className="container-fluid">
    {profile}
  </div>;
});


export default ShowUserProfile;

import React from 'react'
import Posts from './insta_posts'
import { post } from '../ajax'
import store from '../store'
import { Tabs, Tab } from 'react-bootstrap'
import EditUserProfile from './edit-user-profile'
import placeholder from '../../static/placeholder.png'

/**
 * This is a profile page for the specific user. Here they can perform various
 * taks related to their personal information.
 */
export default class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      noPosts: store.getState().ig_posts.size == 0 ? true : false
    }
    if(store.getState().ig_posts.size == 0)
      this.getPosts();
  }

  getPosts() {
    let session = store.getState().session
    post('/user/get_ig_posts', {user_id: session.user_id}).then(resp => {
      if(resp.data.length > 0) {
        this.setState({noPosts: false})
        store.dispatch({
          type: "GOT_POSTS",
          data: resp.data
        });
      }
    })
  }
  render() {
    let dp = store.getState().session.profile_picture
    dp = dp ? dp : placeholder
    return (
      <div id="user-profile" className="container">
        <div className="header">
          <div className="dp">
            <img src={dp} alt="profile_picture"/>
          </div>
          <div className="details">
            <h4>{store.getState().session.user_name}</h4>
            <h5>Friends: 330</h5>
          </div>
        </div>
        <Tabs defaultActiveKey="profile">
          <Tab eventKey="profile" title="Profile">
            <EditUserProfile />
          </Tab>
          <Tab eventKey="posts" title="IG Posts">
            <Posts />
          </Tab>
        </Tabs>
      </div>
    )
  }
}

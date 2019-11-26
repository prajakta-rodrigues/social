import React from 'react'
import Posts from './insta_posts'
import { post } from '../ajax'
import store from '../store'
import { Tabs, Tab } from 'react-bootstrap'
import EditUserProfile from './edit-user-profile'

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
    console.log(session.user_id)
      
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
    return (
      <div id="user-profile" className="container">
        <div className="header">
          <div className="dp">
            <img src="https://scontent.xx.fbcdn.net/v/t51.2885-15/70663288_1203736696487156_3419353749570991582_n.jpg?_nc_cat=104&_nc_ohc=Xh2ya6Fjoi4AQn1uHwdkholp8uLiFGsUzb3T4vXAowP1e2Wy36uMrA8Cw&_nc_ht=scontent.xx&oh=d11d2dd3b1c2c33a985b3c507fc97e3c&oe=5E48B907" alt=""/>
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
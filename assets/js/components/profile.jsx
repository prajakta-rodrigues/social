import React from 'react'
import Posts from './insta_posts'
import { post, updateUserProfilePicture } from '../ajax'
import store from '../store'
import { Tabs, Tab, Row, Col } from 'react-bootstrap'
import EditUserProfile from './edit-user-profile'
import placeholder from '../../static/placeholder.svg'
import { connect } from 'react-redux';
import Chat from "./chat";
import socket from '../socket';
import { createNotification, get_user_data } from "../ajax";
import 'react-chat-widget/lib/styles.css';
import FriendsComponent from './friendsComponent'

// Icon made by https://www.flaticon.com/authors/kiranshastry from www.flaticon.com

/**
 * This is a profile page for the specific user. Here they can perform various
 * taks related to their personal information.
 */
class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.props = props;
        this.state = {
            noPosts: store.getState().ig_posts.size == 0 ? true : false,
            openChat: false,
            channel: null,
            chatChannel: null,
            current_chat: null
        }

        let channel = socket.channel("notif:" + this.props.session.user_id);
        channel.join().receive("ok", (resp) => {
            console.log("notif joined", resp)
        })

        channel.on("send_request",payload=>
        {   console.log("payload", payload)
            if(payload.associated_sender_id != this.props.session.user_id) {
                let notif = {id: payload.id, type: "success", message: payload.message}
            this.props.dispatch({
                type: "NEW_NOTIF",
                data: notif
              });
        }
        });
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

  file_changed(ev) {
    let img = ev.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(img)
    reader.addEventListener('load', () => {
        console.log("changed pic");
        updateUserProfilePicture(reader.result)
    })
  }

  

setCurrentChat(channel) {
  this.setState({current_chat: channel})
  console.log("check", this.state.current_chat)
}

  render() {
    let dp = store.getState().session.profile_picture
    dp = dp ? dp : placeholder
    let chats = {};
    let channel = store.getState().channels
    for(let i = 0; i < channel.length; i++) {
      console.log("channel id", channel[i])
      chats[channel[i]] = <div className="col-sm">
      <Chat channel={socket.channel(channel[i], {})}></Chat></div>
    }
    console.log("all chatsssss", chats["users:24"])
    let current_chats = [];
    for(let i = 0; i < store.getState().chat_list.length; i++) {
      current_chats.push(<div className="row">
      <a onClick={() => {this.setCurrentChat(store.getState().chat_list[i].channel)}}>
      {store.getState().chat_list[i].name}</a></div>)
    }
    console.log("current", this.state.current_chat)
    console.log("current chats", current_chats)
    return (
      <div id="user-profile" className="container">
        <div className="header">
          <div className="dp pic_wrapper">
            <img src={dp} alt="profile_picture" />
            <div className="outer-box">
                <div className="enclosing">
                  <input
                    type="file"
                    name="file"
                    id="profile-photo"
                    className="change-photo"
                    onChange={ev => this.file_changed(ev)}
                  />
                  <label htmlFor="profile-photo" className="change-photo-label"></label>
                </div>
            </div>

          </div>
          <div className="details">
            <h4>{store.getState().session.user_name}</h4>
            <h5>Friends: {store.getState().friends.length}</h5>
          </div>
        </div>
        <Row>
          <Col sm={8}>
          <Tabs defaultActiveKey="profile">
          <Tab eventKey="profile" title="Profile">
            <EditUserProfile />
          </Tab>
          <Tab eventKey="posts" title="IG Posts">
            <Posts />
          </Tab>
          <Tab eventKey="friends" title="Friends">
            <FriendsComponent action={"show profile"}/>
          </Tab>
        </Tabs>
        </Col>
          <Col sm={4}>
            <h1>Current chats</h1>
            {current_chats}
          </Col>
        </Row>
        <div className="chats">
        <div className="row">
        {this.state.current_chat != null ? 
        <Chat channel={socket.channel(this.state.current_chat)}></Chat> : null}
          </div>
        </div>
      </div>
    )
  }
}

function stateToProps(state) {
    return state;
}

export default connect(stateToProps)(Profile);

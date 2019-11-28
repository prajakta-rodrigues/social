import React from 'react'
import Posts from './insta_posts'
import { post } from '../ajax'
import store from '../store'
import { Tabs, Tab } from 'react-bootstrap'
import EditUserProfile from './edit-user-profile'
import placeholder from '../../static/placeholder.png'
import { connect } from 'react-redux';
import Chat from "./chat";
import socket from '../socket';
import { sendRequest, listNotifications, createNotification, changeStatus, 
changeConnectionStatus, get_user_data } from "../ajax";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { AlertList } from 'react-bs-notifier';
import { Button } from 'react-bootstrap';
import { Notifier, AlertContainer } from "react-bs-notifier";
import { Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import FriendsComponent from './friendsComponent'

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
            chatChannel: null
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

    joinChat(sender_id, receiver_id) {
        let channel = "users:";
        if(sender_id > receiver_id) {
            channel = channel + receiver_id + sender_id;
        }else {
            channel = channel + sender_id + receiver_id;
        }
        console.log(channel);
        let chatChannel = socket.channel(channel);
        chatChannel.join().receive("ok", (resp) => {
            this.props.dispatch({
                type: "NEW_CHANNEL",
                data: channel
            })
            console.log(resp)})
        this.setState({chatChannel: chatChannel, openChat: true});
        get_user_data(sender_id)
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

  startChat(receiver_id) {
    //send chat notification to the receiver
    console.log(receiver_id)
    const text = this.props.session.user_name + " sent you a message";
    createNotification(this.props.session.user_id, receiver_id, "CHAT", text, null)
    console.log("start chat");
    const sender_id = this.props.session.user_id;
    this.joinChat(sender_id, receiver_id)
}

  render() {
    let dp = store.getState().session.profile_picture
    dp = dp ? dp : placeholder
    let chats = [];
    let channel = store.getState().channels
    for(let i = 0; i < channel.length; i++) {
      chats.push(<div className="col-sm">
        <Chat channel={socket.channel(channel[i], {})}></Chat></div>)
    }
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
          <Tab eventKey="friends" title="Friends">
            <FriendsComponent />
          </Tab>
        </Tabs>
        <button onClick={() => sendRequest(1, 2)}>Send Request</button> 
        <button onClick={() => this.startChat(2)}>start chat</button>
        <div className="chats">
        <div className="row">
        <div className="col-sm" >
          
          <Chat channel={socket.channel("users:12", {})}></Chat></div>
        <div className="col-sm">
          <Chat channel={socket.channel("users:22", {})}></Chat></div>
          {chats}
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

import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import { Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { listNotifications, changeStatus, get_user_data, startChat, list_messages } from "../ajax";
import { Navbar, Nav, NavDropdown, Overlay } from "react-bootstrap";
import socket from '../socket';
import Chat from "./chat";
import notificationLogo from '../../static/notification-logo.svg';
import store from '../store';
import addFriendLogo from '../../static/add-friend-logo.svg'

class Notifications extends React.Component {
    constructor(props) {
    super(props)
    this.props = props

    let channel = socket.channel("notif:" + this.props.session.user_id);
      channel.join().receive("ok", (resp) => {
        console.log("notif joined", resp)
    })

        channel.on("send_request",payload=>
        {   console.log("payload", payload)
            if(payload.associated_sender_id != this.props.session.user_id) {
            this.props.dispatch({
                type: "NEW_NOTIF",
                data: payload
              });   
        }
        });

        listNotifications(this.props.session.user_id);
        
    }

    onAlertDismissed(alert) {
      const alerts = this.props.notifications;
      // find the index of the alert that was dismissed
      let idx = -1;
      let notification = {};
      alerts.map((notif) => {
          if(notif.id == alert.id) {
              idx = alerts.indexOf(notif)
              notification = notif
          }
      })
      if (idx >= 0) {
          // remove the alert from the array
          const new_alerts = [...alerts.slice(0, idx), ...alerts.slice(idx + 1)]
          this.props.dispatch({
              type: "REMOVE_NOTIF",
              data: new_alerts
            });
            changeStatus(notification)
          if(notification.type == 'CHAT') {
            let sender1 = notification.associated_sender_id;
            let sender2 = notification.receiver_id
            if(notification.associated_sender_id > notification.receiver_id) {
              sender1 = notification.receiver_id
              sender2 = notification.associated_sender_id
            }
            let ch = "users:" + sender1 + sender2
            this.props.dispatch({
            type: "CHANGE_CURRENT_CHANNEL",
            data: ch
          });
          this.joinChat(notification.associated_sender_id, notification.receiver_id)
          
          }
          console.log("see notification", notification);
      }
  }

  joinChat(sender_id, receiver_id) {
    let channel = "users:";
    if(sender_id > receiver_id) {
        channel = channel + receiver_id + sender_id;
    }else {
        channel = channel + sender_id + receiver_id;
    }
    console.log(channel);
    this.setState({current_chat: channel, current_name: ""}) //change this
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

openNotification() {
  let container = document.getElementById('notification-container')
  container.classList.remove('hide')
}

closeNotifications() {
  let container = document.getElementById('notification-container')
  console.log(container)
  container.classList.add('hide')
}

    render() {
      let list = []
        for(let i = 0 ; i < this.props.notifications.length; i++) {
          if(this.props.notifications[i].receiver_id == this.props.session.user_id) {
            let alert = this.props.notifications[i];
          let notif = <div className="notification" key={i} onClick={() => this.onAlertDismissed(alert)}>
            {this.props.notifications[i].type == 'CONNECTION' ? 
            <NavLink to="/requests" onClick={() => {this.closeNotifications()}}>
              <div className="notification-img">
                <img src={addFriendLogo} alt="add-friend-logo"/>
              </div>
              <div className="notification-text">
                {this.props.notifications[i].text}
              </div>
            </NavLink> : 
            <NavLink to="/home" onClick={() => {this.closeNotifications()}}>
              {this.props.notifications[i].text}
            </NavLink>}
          </div>
          list.push(notif)
          }
        }
          console.log("notif here", list)
        return(
        <div>
            <NavLink to="#" onClick={() => this.openNotification()} className="notification-logo-container">
              {list.length > 0 ? <Badge pill variant="danger" className="notification-badge">{list.length}</Badge>: null}
              <OverlayTrigger placement="bottom" overlay={<Tooltip>Notifications</Tooltip>}>
                <img src={notificationLogo} alt="notification-logo" className="nav-icon notification-logo" />
              </OverlayTrigger>
            </NavLink>
            <div className="notification-container hide" id="notification-container">
              <div className="notifications">
                <div className="close-btn" onClick={() => {this.closeNotifications()}}>&times;</div>
                <div className="notification-list">
                  {list.length > 0 ? list : <p style={{ color: "gray", textAlign: 'center', marginTop: '20%' }}> <i> No Notifications to show </i> </p>}
                </div>
              </div>
            </div>
          {/* {list.length > 0 ? <Badge pill variant="danger">{list.length}</Badge>: null}
          <NavDropdown title={<div className="pull-left">
          <img src={notificationLogo} alt="notification-logo" className="nav-icon" />
                    </div>} id="basic-nav-dropdown">
            {list}
          </NavDropdown>  */}
        </div>
        );
    }
}

function stateToProps(state) {
    return state;
  }
  
export default connect(stateToProps)(Notifications);
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import { Badge } from 'react-bootstrap';
import { listNotifications, changeStatus, get_user_data } from "../ajax";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
// import Badge from '@material-ui/core/Badge';
// import { sendRequest, listNotifications, createNotification, changeStatus, 
//   changeConnectionStatus } from "../ajax";

class Notifications extends React.Component {
    constructor(props) {
    super(props)
    this.props = props
    listNotifications(this.props.session.user_id);
    }

    onAlertDismissed(alert) {
      const alerts = this.props.notifications;
      // find the index of the alert that was dismissed
      let idx = -1;
      let notification = {};
      alerts.map((notif) => {
          if(notif. id == alert.id) {
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
          if(notification.type == 'CHAT') {
            let sender1 = notification.associated_sender_id;
            let sender2 = notification.receiver_id
            if(notification.associated_sender_id > notification.receiver_id) {
              sender1 = notification.receiver_id
              sender2 = notification.associated_sender_id
            }
            let ch = "users:" + sender1 + sender2
            this.props.dispatch({
              type: "NEW_CHANNEL",
              data: ch
          })
          get_user_data(notification.associated_sender_id)
          }
      }
      changeStatus(notification)
  }

    render() {
      let list = []
        for(let i = 0 ; i < this.props.notifications.length; i++) {
          let alert = this.props.notifications[i];
          let notif = <div className="dropdown-link" key={i} onClick={() => this.onAlertDismissed(alert)}>
            <NavLink to="/profile">{this.props.notifications[i].text}</NavLink>
          </div>
          list.push(notif)
        }
          console.log("notif here", list)
        return(
          <div>
          {list.length > 0 ? <Badge pill variant="danger">{list.length}</Badge>: null}
         <NavDropdown title="Notifications" id="basic-nav-dropdown"> 
        {list}
            </NavDropdown> 
        </div>
        );
    }
}

function stateToProps(state) {
    return state;
  }
  
export default connect(stateToProps)(Notifications);
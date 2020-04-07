import React from "react";
import { Navbar, Nav, NavDropdown, Tooltip } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import SearchUser from './search-user';
import { OverlayTrigger, Glyphicon } from 'react-bootstrap'

// Icon made by https://www.flaticon.com/authors/smashicons from www.flaticon.com
import userLogo from '../../static/user-logo.svg'

// Icon made by https://www.flaticon.com/authors/freepik from www.flaticon.com
import powerLogo from '../../static/power-logo.svg'

// Icon made by https://www.flaticon.com/authors/freepik from www.flaticon.com
import mapLogo from '../../static/map-logo.svg'

// Icon made by https://www.flaticon.com/authors/freepik from www.flaticon.com
import homeLogo from '../../static/home-logo.svg'

// Icon made by https://www.flaticon.com/authors/google from www.flaticon.com
import notificationLogo from '../../static/notification-logo.svg'

import { listNotifications } from "../ajax";
import store from "../store";
import { Badge } from 'react-bootstrap';
import Notifications from "./notifications";

export default function Navigation(props) {
  // If user is logged in then a channel will be created and if a channel
  // exists then this is the place where every event on the channel will be
  // listened to and an appropriate action would be taken.
  if (props.channel) {
  props.channel.on("update", resp => {
    console.log(resp);
    store.dispatch({
    type: "GOT_POSTS",
    data: resp.data
    });
  });
  }

  return (
  <div id="navbar" className="navbar-style">
    <Navbar variant="dark" expand="lg">
    <Navbar.Brand>
      <NavLink to="/" className="brand-text">
      Social
      </NavLink>
    </Navbar.Brand>
    <Navbar.Toggle className="ml-auto" aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
      {/* Based on the status of authentication of current user, the
        navbar will render appropriate links to visit. */}

      <Session />
    </Navbar.Collapse>
    </Navbar>
  </div>
  );
}

let Session = connect(({ session }) => ({ session }))(
  ({ session, dispatch }) => {
    // To log the user out of the app
    function logout(ev) {
      // ev.preventDefault();
      // This logs user out of the FB instance too.
      if(session.FB_ID)
        FB.logout()

      dispatch({
        type: "LOG_OUT"
      })
      dispatch({
        type: "RESET_APP"
      });
      return(
        <Redirect to="/" />
      )
    }

    // If user is currently logged in, it returns the following links.
    // A bug : It doesnt listen to changes to session on page refresh.
    if (session.token) {
    return (
      <div>
        <div className="search-bar">
            <SearchUser></SearchUser>
        </div>
        <div style={{ display: "inline-block", float: "right" }}>
          <Nav>
            <NavLink to="/home">
              <OverlayTrigger placement="bottom" overlay={<Tooltip>Home</Tooltip>}>
                <img src={homeLogo} alt="home-logo" className="nav-icon" />
              </OverlayTrigger>
            </NavLink>
            <Notifications />
            <NavLink to="/map">
              <OverlayTrigger placement="bottom" overlay={<Tooltip>Map</Tooltip>}>
                <img src={mapLogo} alt="map-logo" className="nav-icon" />
              </OverlayTrigger>
            </NavLink>
            <NavLink to="/profile">
              <OverlayTrigger placement="bottom" overlay={<Tooltip>My Profile</Tooltip>}>
                <img src={userLogo} alt="user-logo" className="nav-icon" />
              </OverlayTrigger>
            </NavLink>
            <NavLink to="/" onClick={logout}>
              <OverlayTrigger placement="bottom" overlay={<Tooltip>Logout</Tooltip>}>
                <img src={powerLogo} alt="power-logo" className="nav-icon" />
              </OverlayTrigger>
            </NavLink>
          </Nav>
        </div>
      </div>
    );
  } else {
    // If user is logged out, it returns the following links
    return (
    <Nav>
      <Nav.Item>
      <NavLink to="/signup" exact className="nav-link">
        Sign Up
      </NavLink>
      </Nav.Item>
    </Nav>
    );
  }
  }
);

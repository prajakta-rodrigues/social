import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import store from "../store";

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
    <div id="navbar" style={{ backgroundColor: '#db625c' ,boxShadow: "0 6px 6px -6px gray" }}>
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
        ev.preventDefault();
        // This logs user out of the FB instance too.
        if(session.FB_ID)
          FB.logout()
        localStorage.removeItem("session");
        dispatch({
          type: "LOG_OUT"
        });
      }
      
      // If user is currently logged in, it returns the following links.
      if (session.token) {
        let insta_app_id = process.env.INSTA_APP_ID
        let redirect_uri = process.env.INSTA_REDIRECT_URI
        let auth_url = "https://api.instagram.com/oauth/authorize"
        + "?app_id=" + insta_app_id
        + "&redirect_uri=" + redirect_uri
        + "&scope=user_profile,user_media&response_type=code"

      return (
        <div style={{ display: "inline-block", float: "right" }}>
          <Nav>
            <NavDropdown title={session.user_name} id="basic-nav-dropdown">
              <div className="dropdown-link">
                <NavLink to="/profile">My Profile</NavLink>
              </div>
              <div className="dropdown-link">
                <a
                  href="#"
                  target="popup"
                  onClick={ev => {
                    ev.preventDefault();
                    let myWindow = window.open(
                      auth_url,
                      "popup",
                      "width=800, height=600"
                    );
                    return false;
                  }}
                >
                  Connect with Instagram
                </a>
              </div>
              <NavDropdown.Divider />
              <div onClick={logout} className="dropdown-link">
                <NavLink to="/">Logout</NavLink>
              </div>
            </NavDropdown>
          </Nav>
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

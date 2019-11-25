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
        ev.preventDefault();
        // This logs user out of the FB instance too.
        if(session.FB_ID)
          FB.logout()
        localStorage.removeItem("session");
        dispatch({
          type: "LOGOUT"
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
        <div style={{ display: "inline-block", float: "right" }}>
          <Nav>
            <NavDropdown title={session.user_name} id="basic-nav-dropdown">
              <div className="dropdown-link">
                <NavLink to="/profile">My Profile</NavLink>
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

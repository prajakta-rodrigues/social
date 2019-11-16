import React from 'react'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux';
import store from '../store'


export default function Navigation(props) {

    console.log(store.getState().session)
    return(
        <div id="navbar">
            <Navbar bg="primary" variant="dark" expand="lg">
            <Navbar.Brand>
                <img src={require('../../static/logo.png')} alt="logo"/>
                Social
            </Navbar.Brand>
            <Navbar.Toggle className="ml-auto" aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Session />
            </Navbar.Collapse>
        </Navbar>
        </div>
    ) 
}

/**
 * Check whether the user is logged into the fb. If so, log them in to the app
 * and redirect them to the main page
 */
FB.getLoginStatus((resp) => {
    if(resp.status === "connected") {
        FB.api('/me/', 'get', {fields: ['email','name']}, (resp) => {
            store.dispatch({
                type: 'LOG_IN',
                data: resp
            })
        })
    }
})


let Session = connect(({ session }) => ({ session }))(
    ({ session, dispatch }) => {
      function logout(ev) {
        ev.preventDefault();
        FB.logout()
        localStorage.removeItem("session");
        dispatch({
          type: "LOG_OUT"
        });
      }
      
      if (session) {
        let insta_app_id = process.env.INSTA_APP_ID
        let redirect_uri = process.env.INSTA_REDIRECT_URI
        let auth_url = "https://api.instagram.com/oauth/authorize"
        + "?app_id=" + insta_app_id
        + "&redirect_uri=" + redirect_uri
        + "&scope=user_profile,user_media&response_type=code"

        return (
          <div style={{ display: "inline-block", float: "right" }}>
            <Nav>
              <NavDropdown title={session.name} id="basic-nav-dropdown">
                <NavDropdown.Item href={auth_url}>Connect with Instagram</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#" onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </div>
        );
      } else {
        return (
            <Nav>
                <Nav.Item>
                    <NavLink to="/signup" exact className="nav-link">Sing up</NavLink>
                </Nav.Item>
            </Nav>
        );
      }
    }
  )
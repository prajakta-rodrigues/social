import React from 'react'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import { Redirect } from 'react-router'
import { connect } from 'react-redux';
import store from '../store'


export default function Navigation(props) {

    // Check whether the user is logged into the app or not.
    if(!store.getState().session) {
      checkUser(props)
    }
    
    // If user is logged in then a channel will be created and if a channel
    // exists then this is the place where every event on the channel will be
    // listened to and an appropriate action would be taken.
    if(props.channel) {
      props.channel.on('update', resp => {
        store.dispatch({
          type: "GOT_POSTS",
          data: resp.data.filter((post) => {
              if(post.media_type === "IMAGE")
                  return post
          })
        })
      })
    } 

    return(
        <div id="navbar">
            <Navbar bg="primary" variant="dark" expand="lg">
            <Navbar.Brand>
                <img src={require('../../static/logo.png')} alt="logo"/>
                <NavLink to="/" className="brand-text">Social</NavLink>
            </Navbar.Brand>
            <Navbar.Toggle className="ml-auto" aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              {/* Based on the status of authentication of current user, the
              navbar will render appropriate links to visit. */}
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
function checkUser(props) {
  FB.getLoginStatus((resp) => {
    if(resp.status === "connected") {
        FB.api('/me/', 'get', {fields: ['email','name']}, (resp) => {
            store.dispatch({
                type: 'LOG_IN',
                data: resp
            })
            props.joinChannel(resp.email)
        })
    }
  })
}


let Session = connect(({ session }) => ({ session }))(
    ({ session, dispatch }) => {
      // To log the user out of the app
      function logout(ev) {
        ev.preventDefault();
        // This logs user out of the FB instance too.
        FB.logout()
        localStorage.removeItem("session");
        dispatch({
          type: "LOG_OUT"
        });
      }
      
      // If user is currently logged in, it returns the following links.
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
                <div className="dropdown-link">
                  <NavLink to="/profile">My Profile</NavLink>
                </div>
                <div className="dropdown-link">
                  <a href="#" 
                    target="popup"
                    onClick={(ev) => {
                      ev.preventDefault()
                      let myWindow = window.open(auth_url, 'popup', 'width=800, height=600')
                      return false
                    }}>Connect with Instagram</a>                  
                </div>
                <NavDropdown.Divider />
                <div onClick={logout} className="dropdown-link"><NavLink to="/">Logout</NavLink></div>
              </NavDropdown>
            </Nav>
          </div>
        );
      } else {
        // If user is logged out, it returns the following links
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
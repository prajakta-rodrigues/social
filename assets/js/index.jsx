import React from "react";
import ReactDOM from "react-dom";

import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import { Provider } from "react-redux";
import socket from './socket'

import Login from "./components/login";
import Insta_auth from './components/insta_auth'
import Navbar from './components/navbar'
import SignUp from "./components/signup";
import store from "./store";
import MapComponent from "./components/maps";
import Profile from "./components/profile";
import EditUserProfile from "./components/edit-user-profile";
import RecommendedUsers from "./components/recommended-users";
import Home from "./components/home";
import ShowUserProfile from "./components/show-user-profile";
import Requests from "./components/requests";
import ProtectedRoute from './protectedRoute'

export default function init_page(root) {
  let tree = (
    <Provider store={store}>
      <Index />
    </Provider>
  );
  ReactDOM.render(tree, root);
  <link rel="stylesheet" href="https://getbootstrap.com/docs/3.3/dist/css/bootstrap.min.css"></link>
}


class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      channel: store.getState().session.email ? socket.channel("user:" + store.getState().session.email) : null
    }
    this.joinChannel = this.joinChannel.bind(this)
    if(this.state.channel) {
      this.state.channel.join().receive("ok", (resp) => console.log(resp))
    }
  }

  /**
   * Component passed to the login component so that when a user is logged in
   * a new channel will be created and they will be joined to that channel. All
   * the notifications and updates now can be sent through this channel.
   */
  joinChannel(email) {
    let userChannel = socket.channel("user:"+email)
    userChannel.join().receive("ok", (resp) => console.log(resp))
    this.setState({channel: userChannel})
  }

  render() {
    // Check whether the user is logged into the app or not.
    return (
      <Router>
        <Navbar channel={this.state.channel} joinChannel={this.joinChannel}/>
        <Switch>
          <Route exact path="/" render={(props) => <Login {...props} channel={this.state.channel} joinChannel={this.joinChannel} />} />
          <ProtectedRoute exact path="/login" render={(props) => <Login {...props} channel={this.state.channel} joinChannel={this.joinChannel} />} />
          <ProtectedRoute exact path="/signup" component={SignUp} />
          <ProtectedRoute exact path="/insta_auth" component={Insta_auth} />
          <ProtectedRoute exact path="/map" component={MapComponent} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <ProtectedRoute exact path="/home" component={Home} />
          <ProtectedRoute exact path="/edit_profile" component={EditUserProfile} />
          <ProtectedRoute exact path="/recommended-users" component={RecommendedUsers} />
          <ProtectedRoute exact path="/user-profile/:id" component={ShowUserProfile} />
          <ProtectedRoute exact path="/user-profile/:id" component={ShowUserProfile} />
          PopularInterests
          <Route exact path="/requests" component={Requests} />
        </Switch>
      </Router>
    )
  }
}

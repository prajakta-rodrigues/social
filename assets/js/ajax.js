import store from "./store";
import socket from './socket'

export function post(path, body) {
	let state = store.getState();
	let token = "";
	if (state.session && state.session.token) {
		token = state.session.token;
  }
  return fetch("/ajax" + path, {
    method: "post",
    credentials: "same-origin",
    headers: new Headers({
      "x-csrf-token": window.csrf_token,
      "content-type": "application/json; charset=UTF-8",
      accept: "application/json",
      "x-auth": token
    }),
    body: JSON.stringify(body)
  }).then(resp => resp.json());
}


export function patch(path, body) {
	let state = store.getState();
	let token = "";
	if (state.session && state.session.token) {
		token = state.session.token;
  }
  return fetch("/ajax" + path, {
    method: "PATCH",
    credentials: "same-origin",
    headers: new Headers({
      "x-csrf-token": window.csrf_token,
      "content-type": "application/json; charset=UTF-8",
      accept: "application/json",
      "x-auth": token
    }),
    body: JSON.stringify(body)
  }).then(resp => resp.json());
}

export function get(path) {
  let state = store.getState();
	let token = "";
	if (state.session && state.session.token) {
		token = state.session.token;
	}

  return fetch("/ajax" + path, {
    method: "get",
    credentials: "same-origin",
    headers: new Headers({
      "x-csrf-token": window.csrf_token,
      "content-type": "application/json; charset=UTF-8",
      accept: "application/json",
      "x-auth": token
    })
  }).then(resp => resp.json());
}

export function submitLogin(form) {
  let state = store.getState();
  let data = state.forms.login;

  post("/sessions", data).then(resp => {
    if (resp.token) {

      store.dispatch({
        type: "LOG_IN",
        data: resp
      });
      form.redirect("/profile");
    } else {
      store.dispatch({
        type: "CHANGE_LOGIN",
        data: { errors: JSON.stringify(resp.errors) }
      });
    }
  });
}

export function changeRequest(request_id, status, idx) {
  post('/connections/update/'+ request_id, {id: request_id, connection : {status: status}})
  .then((resp) => {
    console.log("index of request", idx)
    console.log('connection changes', resp)
    let requests = store.getState().requests
    let idx = -1;
    for(let i = 0; i < requests.length; i++) {
      if(requests[i].request_id == request_id) {
        idx = i;
        break;
      }
    }
    console.log("seee index", idx)
    console.log("see requests", requests)
    const new_requests = [...requests.slice(0, idx), ...requests.slice(idx + 1)]
    console.log(new_requests)
          store.dispatch({
              type: "REMOVE_REQUEST",
              data: new_requests
            });
  })
}

export function listRequests(user_id) {
  let state = store.getState();
  console.log(state);
  post('/connections/' + user_id, {user_id: user_id})
  .then((resp) => {
    console.log("all requests", resp)
    for(let i = 0; i < resp.data.length; i++) {
      let id = resp.data[i].user1_id;
      if(resp.data[i].user1_id == user_id) {
        id = resp.data[i].user2_id;
    }
    let request_id = resp.data[i].id;
    post('/user/' + id, {id: id})
      .then((resp) => {
        resp.data["request_id"] = request_id
        store.dispatch({
          type: "NEW_REQUEST",
          data: resp.data
        })
      });
    }});
}

export function sendRequest(user1_id, user2_id) {
  /* user1_id is always the requester
    user1_id is always smaller than user2_id
  */
 let state = store.getState();
  if(user1_id > user2_id) {
    let temp = user1_id;
    user1_id = user2_id;
    user2_id = temp;
  }
  post('/connections', {connection: {
    status: "PENDING",
    user1_id: user1_id,
    user2_id: user2_id,
    requester_id: user1_id
  }}).then((resp) => {
    const type = "CONNECTION"
    const text = state.session.user_name + " has sent you connection request"
    createNotification(user1_id, user2_id, type, text, resp.id);
    console.log("request sent", resp)
    let id = user1_id;
    if(resp.data.user1_id == state.session.user_id) {
      id = user2_id
    }
    post('/user/' + id, {id: id})
      .then((resp) => {
        store.dispatch({
          type: "NEW_REQUEST",
          data: resp.data
        })
      });
  });
  console.log("new request")
}

export function createNotification(sender_id, receiver_id, type, text, id) {
  //create channel for notification
  let channel = socket.channel("notif:" + receiver_id);
  channel.join().receive("ok", (resp) => {
    console.log("notif joined", resp)})

  let state = store.getState();
  let sender_name = state.session.user_name
  let current_date = new Date();
  console.log(sender_name)
  post('/notifications', {notification: {
    text: text, //sender_name + " has sent you connection request",
    date: current_date,
    type: type, //"CONNECTION",
    associated_sender_id: sender_id,
    receiver_id: receiver_id,
    status: "UNREAD"
  }}).then((resp) => {
    let notif = {text: resp.data.text, associated_sender_id: resp.data.associated_sender_id, receiver_id: resp.data.receiver_id,
    status: resp.data.status, type: resp.data.type, id: resp.data.id}
    console.log("resp",resp)
    console.log("notif", notif)
      store.dispatch({
      type: "NEW_NOTIF",
      data: notif
    });
    
    channel.push("send_request", notif)
    .receive("ok", console.log("received"));
  });
}

export function startChat(receiver_id, action) {
  let sender_id = store.getState().session.user_id;
  let channel = "users:";
  if(sender_id > receiver_id) {
      channel = channel + receiver_id + sender_id;
  }else {
      channel = channel + sender_id + receiver_id;
  }
  //check if channel already exists
  if(!store.getState().channels.includes(channel)) {
      //send chat notification to the receiver
      console.log(receiver_id)
      if(action == "send action") {
          const text = store.getState().session.user_name + " sent you a message";
          createNotification(sender_id, receiver_id, "CHAT", text, null)
      }
      console.log("start chat");
      // const sender_id = this.props.session.user_id;
      joinChat(sender_id, receiver_id)
  }
}

export function joinChat(sender_id, receiver_id) {
  let channel = "users:";
  if(sender_id > receiver_id) {
      channel = channel + receiver_id + sender_id;
  }else {
      channel = channel + sender_id + receiver_id;
  }
  console.log(channel);
  let chatChannel = socket.channel(channel);
  chatChannel.join().receive("ok", (resp) => {
      store.dispatch({
          type: "NEW_CHANNEL",
          data: channel
      })
      console.log(resp)})
  get_user_data(receiver_id, channel)
}

export function list_messages(room) {
  
  post('/messages/' + room, {room: room})
    .then((resp) => {
      store.dispatch({
        type: 'ADD_MESSAGE',
        data: resp.data,
      });
      // msgs = resp.data;
    });
}

export function listNotifications(receiver_id) {
  let state = store.getState();
  post('/notifications/' + receiver_id, {receiver_id: receiver_id})
    .then((resp) => {
      console.log("", resp)
      store.dispatch({
        type: 'ADD_NOTIF',
        data: resp.data
      })
    })
}

export function changeStatus(notification) {
  console.log("id", notification.id)
  // const notification = {associated_sender}
  post('/notifications/update/'+ notification.id, {id: notification.id, notification : {status: "READ"}})
  .then((resp) => {
    console.log('notification changes', resp)
  })
}

export function newMessage(message, channel) {
  let date = new Date();
  post('/messages', {
    message: {
      date: date,
      sender_id: message.id,
      text: message.text,
      room: channel.topic,
      sender_name: message.name
    }
  }).then((resp) => {
        console.log("response",resp);
        store.dispatch({
          type: "NEW_MESSAGE",
          data: {date: resp.date, sender_name: message.name, id: resp.id, text: message.text,
          sender_id: message.id}
        });
      });
  channel.join().receive("ok", (resp) => {console.log(resp)})
  channel.push("send_msg", {text: message.text, sender_name: message.name, id: message.id,
  room: channel.topic, sender_id: message.id}).receive("ok", console.log("received"));
}

export function newUser(form) {
	let state = store.getState();
	let data = state.forms.new_user;

  post("/users", {user: data}).then(resp => {
    if (resp && resp.data) {
      store.dispatch({
        type: "NEW_USER",
        data: resp.data
			});
			form.redirect("/login");
    } else {
      store.dispatch({
        type: "CHANGE_NEW_USER",
        data: { errors: JSON.stringify(resp.errors) }
      });
    }
  });
}

export function get_recommended_users() {
	let state = store.getState();
	let session = state.session;

  get('/user/recommended-users/'+ session.user_id)
    .then((resp) => {
      console.log("recommended-users", resp);
      store.dispatch({
        type: 'GOT_RECOMMENDED_USERS',
        data: resp.data,
      });
    });
}

export function get_user_data(id, channel) {
  post('/user/' + id, {id: id})
  .then((resp) => {
    console.log("get user data", resp)
    console.log("get user", resp)
    let data = resp.data
    console.log("seee channel", channel)
    data["channel"] = channel
    console.log("final data", data)
    store.dispatch({
      type: 'CHAT_LIST',
      data: data
      // data: resp.data 
    })
  });

}

export function updateUserLocation(longitude, latitude) {
	let state = store.getState();
	let session = state.session;

  patch("/users/" + session.user_id, {id: session.user_id, user: {longitude: longitude, latitude:latitude}}).then(resp => {
    if (resp && resp.data) {
      store.dispatch({
        type: "NEW_USER",
        data: resp.data
			});
			store.dispatch({
        type: "UPDATE",
        data: resp.data
			});
    }
  });
}

export function getUserProfile() {
	let state = store.getState();
	let session = state.session;

	get('/profile/get-user-profile/'+ session.user_id)
		.then((resp) => {
			console.log("get-user-profile", resp);
			if(resp.data) {
				console.log("profile found");
				store.dispatch({
					type: "NEW_USER_PROFILE",
					data: resp.data
				});
				store.dispatch({
					type: "CHANGE_USER_PROFILE",
					data: resp.data
				});
			}
		});
}


export function searchUsers() {
	let state = store.getState();
	let session = state.session;
	let text = state.forms.search.text;

  get('/user/search-users/'+ session.user_id + '/' + text)
    .then((resp) => {
      console.log("search-users", resp);
      store.dispatch({
        type: 'GOT_SEARCH_RESULTS',
        data: resp.data,
      });
    });
}


export function getConfigs() {
	let state = store.getState();

  get('/get-configs')
    .then((resp) => {
      console.log("configs", resp);
      store.dispatch({
        type: 'GOT_CONFIG',
        data: resp.data,
      });
    });
}


export function getPopularInterests() {

  get('/profiles/get-popular-interests')
    .then((resp) => {
      console.log("NEW_INTERESTS", resp);
      store.dispatch({
        type: 'NEW_INTERESTS',
        data: resp.data,
      });
    });
}


export function getUserShowProfileById(user_id) {

  get('/user/get-user-show-profile-by-id/'+ user_id)
    .then((resp) => {
      console.log("current user prof received", resp);
			if(resp.data) {
        let profile = resp.data
        post('/user/get_ig_posts', {user_id}).then(resp => {
          let posts = resp.data.reverse()
          let data = {...profile, posts}
          store.dispatch({
            type: 'NEW_SHOW_USER_PROFILE',
            data,
          });
        })
			}
			else{
				store.dispatch({
	        type: 'ERROR_SHOW_USER_PROFILE',
	        data: resp.error,
	      });
			}

    });
}

export function updateUserProfilePicture(picture) {
	let state = store.getState();
	let session = state.session;

  patch("/users/" + session.user_id, {id: session.user_id, user: {profile_picture: picture}}).then(resp => {
    if (resp && resp.data) {
      store.dispatch({
        type: "UPDATE",
        data: resp.data
			});
    }
  });
}

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
    status: "Pending",
    user1_id: user1_id,
    user2_id: user2_id,
    requester_id: user1_id
  }}).then((resp) => {
    const type = "CONNECTION"
    const text = state.session.user_name + " has sent you connection request"
    createNotification(user1_id, user2_id, type, text, resp.id);
    console.log("request sent", resp)
  });
}

export function createNotification(sender_id, receiver_id, type, text, id) {
  //create channel for notification
  let channel = socket.channel("notif:" + receiver_id);
  channel.join().receive("ok", (resp) => {
    const data = "notif:" + receiver_id
    this.props.dispatch({
      type: "NEW_CHANNEL",
      data: data
  })
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
    status: resp.data.status, type: resp.data.type, id: id}
    console.log("resp",resp)
    // let push = {id: resp.data.id, type: "success", message: resp.data.text};
      store.dispatch({
      type: "NEW_NOTIF",
      data: notif
    });
    //console.log("notification sent", resp)
    //console.log(notif);
    //console.log(resp)
    //console.log("push",push)
    channel.push("send_request", notif)
    .receive("ok", console.log("received"));
  });
}

// export function list_messages(room) {
//   let msgs = [];
//   post('/messages/' + room, {room: room})
//     .then((resp) => {
//       // const messages = resp.data.map((msg) => {return {author: 'them', type: 'text', data: msg.text}});
//       //const data = {author: 'them', type: 'text', data: resp.data.text};
//       // console.log("resp list message", messages)
//       // store.dispatch({
//       //   type: 'ADD_MESSAGE',
//       //   data: resp.data,
//       // });
//       msgs = resp.data;
//     });
// }

export function listNotifications(receiver_id) {
  let state = store.getState();
  post('/notifications/' + receiver_id, {receiver_id: receiver_id})
    .then((resp) => {
      store.dispatch({
        type: 'ADD_NOTIF',
        data: resp.data
      })

      // console.log("resp data", resp.data)
      // let channels = state.channels;
      // // const topics = state.channels.map((channel) => {channel.topic})
      // // console.log("topics", topics)
      // for(let i = 0; i < resp.data.length; i++) {
      //   console.log("inside loop")
      //   if(resp.data[i].type == 'CHAT') {
      //     let chat = "users:";
      //     if(resp.data[i].associated_sender_id > resp.data[i].receiver_id) {
      //         chat = chat + resp.data[i].receiver_id + resp.data[i].associated_sender_id;
      //     }else {
      //         chat = chat + resp.data[i].associated_sender_id + resp.data[i].receiver_id;
      //     }
      //     if(!channels.includes(chat)) {
      //         let chatChannel = socket.channel(chat);
      //         chatChannel.join().receive("ok", (resp) => {
      //         store.dispatch({
      //             type: "NEW_CHANNEL",
      //             data: chat
      //         })
      //         console.log("chat joined", resp)})
      //         channels = [...channels, chat]
      //     }
      // }
      // }
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

export function changeConnectionStatus(notif, status) { 
  // post('/connections/update/' + )
}

// export function newMessage(message, channel) {
//   let date = new Date();
//   post('/messages', {
//     message: {
//       date: date,
//       sender_id: message.id,
//       text: message.text,
//       room: channel.topic,
//       sender_name: message.name
//     }
//   }).then((resp) => {
//         console.log("response",resp);
//         store.dispatch({
//           type: "NEW_MESSAGE",
//           data: {date: resp.date, sender_name: message.name, id: resp.id, text: message.text}
//         });
//       });
//   channel.join().receive("ok", (resp) => {console.log(resp)})
//   channel.push("send_msg", {text: message.text, sender_name: message.name, id: message.id,
//   room: channel.topic}).receive("ok", console.log("received"));
// }

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

export function updateUserLocation(longitude, latitude) {
	let state = store.getState();
	let session = state.session;

  patch("/users/" + session.user_id, {id: session.user_id, user: {longitude: longitude, latitude:latitude}}).then(resp => {
    if (resp && resp.data) {
      store.dispatch({
        type: "NEW_USER",
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

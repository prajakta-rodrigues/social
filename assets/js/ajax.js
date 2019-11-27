import store from "./store";

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
      localStorage.setItem("session", JSON.stringify(resp));
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
			else {
				store.dispatch({
					type: "CLEAR_USER_PROFILE",
					data: {}
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

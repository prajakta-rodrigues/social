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
      form.redirect("/test");
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


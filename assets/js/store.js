import { createStore, combineReducers } from "redux";
import deepFreeze from "deep-freeze-strict";


/**
 * store = {
 *    session: {...},
 *    forms: {...},
 *    posts: {...},
 * }
 */

function login(
  st0 = { email: "", password: "", errors: null },
  action
) {
  switch (action.type) {
    case "CHANGE_LOGIN":
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

function new_user(
  st0 = {
    name: "",
    email: "",
    dob: "",
    username: "",
    password: "",
  },
  action
) {
  switch (action.type) {
    case "CHANGE_NEW_USER":
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

function forms(st0, action) {
  let reducer = combineReducers({
    login,
    new_user
  });
  return reducer(st0, action);
}

let session0
if (localStorage.getItem("session")) {
  session0 = JSON.parse(localStorage.getItem("session"));
} else {
  session0 = {
    token: null,
    user_name: null,
    user_id: null,
    email: null,
  }
}
function session(st0 = session0, action) {
  switch (action.type) {
    case "LOG_IN": {
      let st1 = {...st0, ...action.data}
      return st1
    }
    case "LOG_OUT":{
      let st1 = session0
      return st1
    }
    default:
      return st0;
  }
}

function users(st0 = new Map(), action) {
  switch (action.type) {
    case "NEW_USER":
      let st1 = new Map(st0);
      st1.set(action.data.id, action.data);
      return st1;
    default:
      return st0;
  }
}

function ig_posts(st0 = new Map(), action) {
  switch(action.type) {
    case "GOT_POSTS": {
      let st1 = new Map(st0)
      action.data.forEach((el) => st1.set(el.id, el))
      return st1
    }
    default:
      return st0
  }
}

function root_reducer(st0, action) {
  console.log("root reducer", st0, action);
  let reducer = combineReducers({
    forms,
    users,
    session,
    ig_posts
  });
  return deepFreeze(reducer(st0, action));
}

let store = createStore(root_reducer);
export default store;

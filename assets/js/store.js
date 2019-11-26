import { createStore, combineReducers } from "redux";
import deepFreeze from "deep-freeze-strict";


/**
 * store = {
 *    session: {...},
 *    forms: {...},
 *    posts: {...},
 * }
 */
let session0 = localStorage.getItem("session");
if (session0) {
  session0 = JSON.parse(session0);
}

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

function user_profile(st0 = {id: null, behavior: "", description: "", interests: "",
qualities: [], request_setting_allow: "", user_id: null, errors: ""}, action) {
  switch (action.type) {
    case "CHANGE_USER_PROFILE":
    console.log(action.data);
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}


function forms(st0, action) {
  let reducer = combineReducers({
    login,
    new_user,
    user_profile
  });
  return reducer(st0, action);
}

function session(st0 = session0, action) {
  switch (action.type) {
    case "LOG_IN":
      return action.data;
    case "LOG_OUT":
      return null;
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

function recommendedUsers(st0 = new Map(), action) {
  switch(action.type) {
    case "GOT_RECOMMENDED_USERS": {
      let st1 = new Map(st0)
      action.data.forEach((el) => st1.set(el.id, el))
      return st1
    }
    default:
      return st0
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
    ig_posts,
    recommendedUsers
  });
  return deepFreeze(reducer(st0, action));
}

let store = createStore(root_reducer);
export default store;

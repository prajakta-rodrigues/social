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

function search(st0 ={text:""}, action) {
  switch (action.type) {
    case "CHANGE_SEARCH":
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
    FB_ID: "",
    profile_picture: "",
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

function user_profile(st0 = {id: null, description: "",
interests:[], sports:[],movies:[],
request_setting_allow: "", user_id: null, errors: ""}, action) {
  switch (action.type) {
    case "CHANGE_USER_PROFILE":
    console.log(action.data);
      return Object.assign({}, st0, action.data);
      case "CLEAR_USER_PROFILE":
        return {id: null, description: "", interests: "",
        qualities: [], interests:[], sports:[],movies:[],
        request_setting_allow: "", user_id: null, errors: ""}
    default: return st0;
  }
}

function messages(st0 = [], action) {
  switch(action.type) {
    case "NEW_MESSAGE":
      return [...st0, action.data];
    case "ADD_MESSAGE":
      return action.data
    default:
      return st0;
  }
}


function forms(st0, action) {
  let reducer = combineReducers({
    login,
    new_user,
    user_profile,
    search
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
    profile_picture: null,
  }
}
function session(st0 = session0, action) {
  switch (action.type) {
    case "LOG_IN": {
      let st1 = {...st0, ...action.data}
      localStorage.setItem("session", JSON.stringify(st1));
      return st1
    }
    case "UPDATE": {
      console.log(st0);
      console.log(action.data);
      let changed = Object.assign({}, st0, action.data);
      localStorage.setItem("session", JSON.stringify(changed));
      return changed;
    }
    case "LOG_OUT":{
      localStorage.removeItem("session")
      session0 = {
        token: null,
        user_name: null,
        user_id: null,
        email: null,
        profile_picture: null,
      }
      return session0
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

function showUserProfile(st0 = null, action) {
  switch (action.type) {
    case "NEW_SHOW_USER_PROFILE":
      console.log(action);
      let st1 = action.data;
      return st1;
    case "ERROR_SHOW_USER_PROFILE":
      let st2 = {
        "error" : action.data
      }
      console.log(st2);
      return st2;
    default:
      return st0;
  }
}

function searchresults(st0 = new Map(), action) {
  switch(action.type) {
    case "GOT_SEARCH_RESULTS": {
      let st1 = new Map()
      console.log(action.data);
      action.data.forEach((el) => st1.set(el.id, el))
      return st1
    }
    case "CLEAR_RESULTS":
      return new Map()
    default:
      return st0
  }
}

function recommendedUsers(st0 = new Map(), action) {
  switch(action.type) {
    case "GOT_RECOMMENDED_USERS": {
      let st1 = new Map(st0)
      action.data.forEach((el) => st1.set(el.id, el))
      return st1
    }
    case "REQUEST_SENT": {
      let st2 = new Map(st0)
      st2.delete(action.data);
      console.log("after", st2);
      return st2;
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

function configs(st0 = new Map(), action) {
  switch (action.type) {
    case "GOT_CONFIG": {
      let st1 = new Map(st0)
      action.data.forEach((el) => st1.set(el.id, el))
      return st1
    }
    default:
      return st0
  }
}

function user_profiles(st0 = new Map(), action) {
  switch (action.type) {
    case "NEW_USER_PROFILE":
      let st1 = new Map(st0);
      st1.set(action.data.id, action.data);
      return st1;
    default:
      return st0;
  }
}

function popularInterests(st0 = [], action) {
  switch(action.type) {
    case "NEW_INTERESTS":
      console.log(typeof st0);
      return st0.concat(action.data);
    default:
      return st0;
  }
}


function notifications(st0 = [], action) {
  switch(action.type) {
    case "NEW_NOTIF":
      return [...st0, action.data];
    case "ADD_NOTIF":
      return action.data
    case "REMOVE_NOTIF":
      return action.data
    default:
      return st0;
  }
}

function channels(st0 = [], action) {
  switch(action.type) {
    case "NEW_CHANNEL": {
      return [...st0, action.data];
    }
    case "ALL_CHANNEL": {
      return action.data
    }
    default:
      return st0
  }
}

function chat_list(st0 = [], action) {
  switch(action.type) {
    case "CHAT_LIST": {
      return [...st0, action.data]
    }
    default:
      return st0
  }
}

function friends(st0 = [], action) {
  switch(action.type) {
    case "GOT_FRIENDS":
      let st1 =  st0.concat(action.data)
      return st1
    default:
      return st0
  }
  }

function current_channel(st0 = null, action) {
  switch(action.type) {
    case "CHANGE_CURRENT_CHANNEL": {
      return action.data
    }
    default:
      return st0
  }
}

function requests(st0 = [], action) {
  switch(action.type) {
    case "NEW_REQUEST": {
      return [...st0, action.data]
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
    user_profiles,
    ig_posts,
    recommendedUsers,
    searchresults,
    messages,
    notifications,
    channels,
    chat_list,
    popularInterests,
    configs,
    showUserProfile,
    friends,
    requests,
    current_channel
  });
  return deepFreeze(reducer(st0, action));
}

const reducerWrapper = (state, action) => {
  if(action.type === "RESET_APP")
    state = undefined

  return root_reducer(state, action)
}

let store = createStore(reducerWrapper, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;

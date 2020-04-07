// This is a popup through which user can give permission for accessing their
// IG from the app. On approval, a message will be broadcasted from the server
// indicating successful authorization or if permission is not given then an
// error message will be displayed. This popup will self close on success or 
// failure.

import { post } from '../ajax'
import store from '../store'

export default function Insta_auth(props) {
    /**
     * Get the code from the redirected url and send it to server.
     * Server will exchange the code for an access token and then posts will
     * be fetched on served side.
     */
    let code = props.location.search.split("=")[1]
    let session = store.getState().session
    if(session.token) {
        post("/user/connect_with_ig", {code, id: session.user_id, channel: session.email}).then(resp => {
            window.close()
        })
    }
    return null
    
}
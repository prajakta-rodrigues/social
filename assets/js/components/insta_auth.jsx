//TODO: FIGURE OUT A WAY TO OVERCOME CORS ERROR.

import React from 'react'

export default function Insta_auth(props) {
    let code = props.location.search.split("=")[1]
    let app_secret = process.env.INSTA_APP_SECRET
    let app_id = process.env.INSTA_APP_ID
    let redirect_uri = "https://localhost:4040/insta_auth/"

    fetch('https://api.instagram.com/oauth/access_token', {
        method: 'post',
        body: "app_id=" + app_id 
            + "&app_secret=" + app_secret
            + "&grant_type=authorization_code"
            + "&redirect_uri=" + redirect_uri
            + "&code=" + code 
    }).then((resp) => console.log(resp))
    return (
        <h1>Hello User</h1>
    )
}
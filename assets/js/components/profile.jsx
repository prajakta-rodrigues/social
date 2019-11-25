import React from 'react'
import Posts from './insta_posts'
import { post } from '../ajax'
import store from '../store'

/**
 * This is a profile page for the specific user. Here they can perform various
 * taks related to their personal information.
 */
export default class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            noPosts: store.getState().ig_posts.size == 0 ? true : false
        }
        if(store.getState().ig_posts.size == 0)
            this.getPosts();
    }

    getPosts() {
        let session = store.getState().session
        console.log(session.user_id)
            
        post('/user/get_ig_posts', {user_id: session.user_id}).then(resp => {
            if(resp.data.length > 0) {
                this.setState({noPosts: false})
                store.dispatch({
                    type: "GOT_POSTS",
                    data: resp.data
                });
            }
        })
    }
    render() {
        return (
            <div>
                <h1 align="center">User's Profile</h1>
                <Posts />
            </div>
        )
    }
}
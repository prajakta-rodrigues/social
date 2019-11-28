import React from 'react'
import { get } from '../ajax'
import store from '../store'
export default class FriendsComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
           friends: null
        }
        get('/user/friends/' + store.getState().session.user_id).then(resp => this.setState({friends: resp.data})) 
    }

    render() {
        console.log(this.state)
        return (
            <div id="friend-list">
                <h4>Friends</h4>
            </div>
        )
    }
}
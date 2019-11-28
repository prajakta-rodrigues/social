import React from 'react'
import { get } from '../ajax'
import store from '../store'
import placeholder from '../../static/placeholder.png'
export default class FriendsComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
           friends: null
        }
        get('/user/friends/' + store.getState().session.user_id).then(resp => this.setState({friends: resp.data})) 
    }

    renderFriends() {
        let list = this.state.friends.map(friend => {
            let dp = friend.profile_picture
            dp = dp ? dp : placeholder

            return(
                <div className="friend" key={friend.id}>
                    <img src={dp} alt="dp" className="friend-img"/>
                    <span className="">{friend.name}</span>
                    <hr/>
                </div>
            )
        }) 
        return list
    }

    render() {
        if(this.state.friends) {
            return (
                <div id="friend-list">
                    {this.renderFriends()}
                </div>
            )
        } else return null
    }
}
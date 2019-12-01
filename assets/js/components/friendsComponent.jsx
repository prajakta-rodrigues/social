import React from 'react'
import { get } from '../ajax'
import store from '../store'
import { Link } from 'react-router-dom'
import placeholder from '../../static/placeholder.svg'
export default class FriendsComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
           friends: store.getState().friends
        }

        if(this.state.friends.length == 0) {
            get('/user/friends/' + store.getState().session.user_id).then(resp => {
                store.dispatch({
                    type: 'GOT_FRIENDS',
                    data: resp.data
                })
                this.setState({friends: resp.data})
            }) 
        }
    }

    renderFriends() {
        console.log(this.state.friends)
        let list = this.state.friends.map(friend => {
            let dp = friend.profile_picture
            dp = dp ? dp : placeholder

            return(
                <div className="friend" key={friend.id}>
                    <img src={dp} alt="dp" className="friend-img"/>
                    <Link to={"/user-profile/" + friend.id} className="friend-name">{friend.name}</Link>
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
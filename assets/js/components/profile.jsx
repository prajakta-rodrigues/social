import React from 'react'
import ReactDOM from 'react-dom'
import Posts from './insta_posts'

export default class Profile extends React.Component {
    constructor(props) {
        super(props)
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
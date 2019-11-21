import React from 'react'
import Posts from './insta_posts'

/**
 * This is a profile page for the specific user. Here they can perform various
 * taks related to their personal information.
 */
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
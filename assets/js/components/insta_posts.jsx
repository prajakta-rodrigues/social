import React from 'react'
import { connect } from 'react-redux'
import store from '../store'
const posts = connect(({ ig_posts }) => ({ ig_posts }))(({ ig_posts }) => {
  //Get the posts if the size of posts is 0.
  let renderPosts = Array.from(ig_posts, ([key, post]) => {
      return(
          <div key={key} className="ig_post col-sm-4">
              <img src={post.media_url} alt={post.id} className="post-img img-fluid" />
          </div>
      )
  })
  return(
      <div className="container">
          <h1>Instagram Posts</h1>
          <div className="row">
            {renderPosts}
          </div>
      </div>
  )
// return null
})

export default posts
import React from 'react'
import { connect } from 'react-redux'

/**
 * This is to show the posts of the user from their IG account.
 */
const posts = connect(({ ig_posts }) => ({ ig_posts }))(({ ig_posts }) => {
  //Get the posts if the size of posts is 0.

  /**
   * To render the posts into its own HTML element and form an array of it.
   * This list will be then rendered in the return statement of the function.
   */
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
})

export default posts
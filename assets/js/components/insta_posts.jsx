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
          <div key={key} className="ig_post">
              <img src={post.media_url} alt={post.id} className="post-img img-fluid" />
          </div>
      )
  })
  renderPosts = renderPosts.reverse()
  
  if(ig_posts.size == 0) {
      let insta_app_id = process.env.INSTA_APP_ID
          let redirect_uri = process.env.INSTA_REDIRECT_URI
          let auth_url = "https://api.instagram.com/oauth/authorize"
          + "?app_id=" + insta_app_id
          + "&redirect_uri=" + redirect_uri
          + "&scope=user_profile,user_media&response_type=code"
      return(
        <div className="ig-placeholder-container">
            <div className="btn btn-outline-social action-btn connect-ig">
                <a
                    href="#"
                    target="popup"
                    onClick={ev => {
                        ev.preventDefault();
                        let myWindow = window.open(
                        auth_url,
                        "popup",
                        "width=800, height=600"
                        );
                        return false;
                    }}
                    >Connect with Instagram</a>
            </div>
        </div>
      )
  } else {
    return(
        <div className="ig-post-container">
            <div className="posts">
              {renderPosts}
            </div>
        </div>
    )
  }
  
})

export default posts
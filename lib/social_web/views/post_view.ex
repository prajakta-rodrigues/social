defmodule SocialWeb.PostView do
  use SocialWeb, :view
  alias SocialWeb.PostView

  def render("index.json", %{posts: posts}) do
    %{data: render_many(posts, PostView, "post.json")}
  end

  def render("show.json", %{post: post}) do
    %{data: render_one(post, PostView, "post.json")}
  end

  def render("post.json", %{post: post}) do
    %{id: post.id,
      media_id: post.media_id,
      media_url: post.media_url,
      media_type: post.media_type}
  end
end

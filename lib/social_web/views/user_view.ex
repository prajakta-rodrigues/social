defmodule SocialWeb.UserView do
  use SocialWeb, :view
  alias SocialWeb.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      dob: user.dob,
      password: user.password,
      longitude: user.longitude,
      latitude: user.latitude,
      profile_picture: user.profile_picture
    }
  end
end

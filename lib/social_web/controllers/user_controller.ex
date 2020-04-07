defmodule SocialWeb.UserController do
  use SocialWeb, :controller

  alias Social.Users
  alias Social.Users.User
  alias Social.Profiles

  action_fallback SocialWeb.FallbackController

  def index(conn, _params) do
  users = Users.list_users()
  render(conn, "index.json", users: users)
  end

  def create(conn, %{"user" => user_params}) do
  userAlreadyExists = Users.get_user_by_email(user_params["email"])
  if !userAlreadyExists do
    with {:ok, %User{} = user} <- Users.create_user(user_params) do
    conn
    |> put_status(:created)
    |> put_resp_header("location", Routes.user_path(conn, :show, user))
    |> render("show.json", user: user)
    end
  else
    resp = %{errors: "User with the entered email address already exists, please login!"}
    conn
    |> put_resp_header("content-type", "application/json; charset=UTF-8")
    |> send_resp(:unauthorized, Jason.encode!(resp))
  end
  end

  def show(conn, %{"id" => id}) do
  user = Users.get_user!(id)
  render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
  user = Users.get_user!(id)

  with {:ok, %User{} = user} <- Users.update_user(user, user_params) do
    render(conn, "show.json", user: user)
  end
  end

  def delete(conn, %{"id" => id}) do
  user = Users.get_user!(id)

  with {:ok, %User{}} <- Users.delete_user(user) do
    send_resp(conn, :no_content, "")
  end
  end

  def get_by_email(conn, %{"email" => email}) do
  user = Users.get_by_email(email)
  render(conn, "show.json", user: user)
  end

  def get_with_token(conn, %{"email" => email, "id"=>id}) do
  if id == System.get_env("APP_ID") do
    user = Users.get_by_email(email)
    IO.inspect user
    if user do
    token = Phoenix.Token.sign(conn, "session", user.id)
    data = %{
      user_name: user.name,
      token: token,
      user_id: user.id,
      email: email,
      message: "success",
      profile_picture: user.profile_picture,
    }
    send_resp(conn, 200, Jason.encode!(data))
    else
    send_resp(conn, 404, Jason.encode!(%{"message" => "user not found"}))
    end
  else
    send_resp(conn, 403, Jason.encode!(%{"error" => "Unauthorized access"}))
  end

  end
  # To get the posts from instagram.
  def connect_with_ig(conn, %{"code" => code, "id" => id, "channel" => channel}) do
  HTTPoison.start
  body = URI.encode_query(%{
    "app_id" => System.get_env("INSTA_APP_ID"),
    "app_secret" => System.get_env("INSTA_APP_SECRET"),
    "grant_type" => "authorization_code",
    "redirect_uri" => "https://social.megharth.site/insta_auth",
    "code" => code
    })
    # Get the access token by exchanging the code.
  {:ok, response} = HTTPoison.post("https://api.instagram.com/oauth/access_token", body, [{"Content-Type", "application/x-www-form-urlencoded"}])
  {_, body} = Jason.decode(response.body)
  if body["access_token"] do
    user_id = body["user_id"]
    # Get user's media
    url = "https://graph.instagram.com/#{user_id}/media?fields=id,media_url,media_type&access_token=#{body["access_token"]}"
    response = HTTPoison.get!(url)
    {_, body} = Jason.decode(response.body)
    posts = Enum.filter(body["data"], fn x ->
    if x["media_url"] do
      x
    end
    end)
    Enum.each(posts, fn post ->
    new_post = %{
      media_id: post["id"],
      media_type: post["media_type"],
      media_url: post["media_url"],
      user_id: id
    }
    IO.inspect new_post
    Social.Posts.create_post(new_post)
    end)
    # Broadcast the message through genserver.
    Social.UserGenServer.broadcast_posts(channel, %{data: posts})
    send_resp(conn, 200, Jason.encode!(%{message: "Got posts successfully."}))
  else
    send_resp(conn, 403, Jason.encode!(%{error: body["error_message"]}))
  end

  end


  def get_recommended_users(conn,  params) do
    IO.inspect(params)
    users = Users.get_recommended_users(params["id"])
    render(conn, "index.json", users: users)
  end

  def get_search_users(conn,  params) do
    IO.inspect(params)
    users = Users.get_search_users(params["id"], params["query"])
    render(conn, "index.json", users: users)
  end

  def get_user_show_profile(conn,  params) do
      IO.inspect(params)
      user = Users.get_user!(params["id"])
      profile = Profiles.get_profile_by_user_id!(params["id"])
      if(user != nil and profile != nil) do
        send_resp(conn, 200, Jason.encode!(%{data: %{
          id: user.id,
          name: user.name,
          dob: user.dob,
          email: user.email,
          profile_picture: user.profile_picture,
          description: profile.description,
          interests: profile.interests,
          movies: profile.movies,
          sports: profile.sports
          }}))
      else if(user != nil) do
        send_resp(conn, 200, Jason.encode!(%{data: %{
          id: user.id,
          name: user.name,
          dob: user.dob,
          email: user.email,
          profile_picture: user.profile_picture,
          description: "",
          interests: [],
          movies: [],
          sports: []
          }}))
        else
          send_resp(conn, 500, Jason.encode!(%{error: "No user found"}))
        end
      end
    end

    def get_friends(conn, %{"id" => id}) do
      friends = Social.Connections.get_friends(id)
      |> Enum.map(fn connection ->
        IO.inspect connection
        {id, _} = Integer.parse(id)
        if connection.user1_id == id do
          IO.inspect connection.user1_id
          Social.Users.get_user!(connection.user2_id)
        else
          IO.inspect connection.user2_id
          Social.Users.get_user!(connection.user1_id)
        end
      end)

      IO.inspect friends
      render(conn, "index.json", users: friends)
    end

end

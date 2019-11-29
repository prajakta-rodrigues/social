defmodule SocialWeb.Router do
  use SocialWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :ajax do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  # There were 2 scopes so deleted the api scope. We can work with /ajax scope
  scope "/ajax", SocialWeb do
    pipe_through :ajax

    get "/user/:email", UserController, :get_by_email
    post "/user/get_with_token/", UserController, :get_with_token
    post "/user/connect_with_ig", UserController, :connect_with_ig
    post "/user/get_ig_posts", PostController, :get_ig_posts
    get "/user/recommended-users/:id", UserController, :get_recommended_users
    get "/user/search-users/:id/:query", UserController, :get_search_users
    get "/profile/get-user-profile/:id", ProfileController, :get_user_profile
    get "/get-configs", ConfigController, :index
    resources "/users", UserController, except: [:new, :edit]
    resources "/sessions", SessionController, only: [:create], singleton: true
    resources "/connections", ConnectionController, except: [:new, :edit]
    resources "/messages", MessageController, except: [:new, :edit]
    resources "/notifications", NotificationController, except: [:new, :edit]
    resources "/posts", PostController, except: [:edit]
    resources "/profiles", ProfileController, except: [:new, :edit]
    resources "/configs", ConfigController, except: [:new, :edit]
  end

  scope "/", SocialWeb do
    pipe_through :browser

    get "/*path", PageController, :index
  end
end

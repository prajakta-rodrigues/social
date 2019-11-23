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
    post "/user/ig_posts", UserController, :get_ig_posts
    resources "/users", UserController, except: [:new, :edit]
    resources "/sessions", SessionController, only: [:create], singleton: true
    resources "/connections", ConnectionController, except: [:new, :edit]
    resources "/messages", MessageController, except: [:new, :edit]
    resources "/notifications", NotificationController, except: [:new, :edit]
    resources "/posts", PostController, except: [:edit]
    resources "/profiles", ProfileController, except: [:new, :edit]
  end

  scope "/", SocialWeb do
    pipe_through :browser

    get "/*path", PageController, :index
  end
end

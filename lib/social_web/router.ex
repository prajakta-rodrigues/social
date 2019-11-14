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

  scope "/ajax", SocialWeb do
    pipe_through :ajax

    resources "/users", UserController, except: [:new, :edit]
    resources "/sessions", SessionController, only: [:create], singleton: true
  end

  scope "/", SocialWeb do
    pipe_through :browser

    get "/", PageController, :index
    get "/*path", PageController, :index
  end

  # Other scopes may use custom stacks.
  scope "/api", SocialWeb do
    pipe_through :api
    resources "/users", UserController, except: [:new, :edit]
    resources "/connections", ConnectionController, except: [:new, :edit]
    resources "/messages", MessageController, except: [:new, :edit]
    resources "/notifications", NotificationController, except: [:new, :edit]
  end
end

defmodule SocialWeb.PageController do
  use SocialWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end

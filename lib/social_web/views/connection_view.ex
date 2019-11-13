defmodule SocialWeb.ConnectionView do
  use SocialWeb, :view
  alias SocialWeb.ConnectionView

  def render("index.json", %{connections: connections}) do
    %{data: render_many(connections, ConnectionView, "connection.json")}
  end

  def render("show.json", %{connection: connection}) do
    %{data: render_one(connection, ConnectionView, "connection.json")}
  end

  def render("connection.json", %{connection: connection}) do
    %{id: connection.id,
      status: connection.status}
  end
end

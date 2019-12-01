defmodule SocialWeb.ConnectionController do
  use SocialWeb, :controller

  alias Social.Connections
  alias Social.Connections.Connection

  action_fallback SocialWeb.FallbackController

  def index(conn, _params) do
    connections = Connections.list_connections()
    render(conn, "index.json", connections: connections)
  end

  def create(conn, %{"connection" => connection_params}) do
    with {:ok, %Connection{} = connection} <- Connections.create_connection(connection_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.connection_path(conn, :show, connection))
      |> render("show.json", connection: connection)
    end
  end

  def list_requests(conn, %{"user_id" => user_id}) do
    requests = Connections.list_requests(user_id)
    render(conn, "index.json", connections: requests)
  end

  def show(conn, %{"id" => id}) do
    connection = Connections.get_connection!(id)
    render(conn, "show.json", connection: connection)
  end

  def update(conn, %{"id" => id, "connection" => connection_params}) do
    connection = Connections.get_connection!(id)

    with {:ok, %Connection{} = connection} <- Connections.update_connection(connection, connection_params) do
      render(conn, "show.json", connection: connection)
    end
  end

  def delete(conn, %{"id" => id}) do
    connection = Connections.get_connection!(id)

    with {:ok, %Connection{}} <- Connections.delete_connection(connection) do
      send_resp(conn, :no_content, "")
    end
  end
end

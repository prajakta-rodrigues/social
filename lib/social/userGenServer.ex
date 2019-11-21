defmodule Social.UserGenServer do
  use GenServer

  def start(name) do
    spec = %{
      id: __MODULE__,
      start: {__MODULE__, :start_link, [name]},
      restart: :permanent,
      type: :worker,
    }

    Social.UserSup.start_child(spec)
  end

  def reg(id) do
    {:via, Registry, {Social.UserReg, id}}
  end

  def start_link(id) do
    GenServer.start_link(__MODULE__, id, name: reg(id))
  end

  def init(id) do
    {:ok, id}
  end

  # To broadcast the posts to the channel to which current user is connected.
  def broadcast_posts(id, data) do
    broadcast(id, data)
    # {:reply, {:ok, %{"message" => "broadcast successful"}}}
  end

  defp broadcast(id, data) do
    SocialWeb.Endpoint.broadcast!("user:"<>id, "update", data)
  end
end

defmodule SocialWeb.UserChannel do
  use SocialWeb, :channel

  alias Social.UserGenServer

  def join("user:"<>id, _payload, socket) do
    socket = socket
    |> assign(:id ,id)
    UserGenServer.start(id)
    {:ok, %{"message" => "Channel Joined"}, socket}
  end
end

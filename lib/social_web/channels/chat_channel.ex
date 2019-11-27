defmodule SocialWeb.ChatChannel do
    use SocialWeb, :channel
  
    def join("users:"<>id, _payload, socket) do
      socket = socket
      |> assign(:id ,id)
      {:ok, %{"message" => "Channel Joined"}, socket}
    end

    def handle_in("send_msg", %{"text" => text, "sender_name" => name, "id" => id, "room" => room}, socket) do
      broadcast!(socket, "send_msg", %{sender_name: name, text: text, id: id, room: room})
      {:noreply, socket}
    end

  end
  
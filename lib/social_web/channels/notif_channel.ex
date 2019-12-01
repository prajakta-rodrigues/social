defmodule SocialWeb.NotifChannel do
    use SocialWeb, :channel
  
    def join("notif:"<>id, _payload, socket) do
      socket = socket
      |> assign(:id ,id)
      {:ok, %{"message" => "Channel Joined"}, socket}
    end

    def handle_in("send_request", %{"associated_sender_id" => associated_sender_id, 
    "receiver_id" => receiver_id, "status" => status, "text" => text, "type" => type, "id" => id}, socket) do
      broadcast!(socket, "send_request", %{associated_sender_id: associated_sender_id, receiver_id: 
      receiver_id, status: status, text: text, type: type, id: id})
      {:noreply, socket}
    end

  end
  
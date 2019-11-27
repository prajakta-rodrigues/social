defmodule SocialWeb.MessageView do
  use SocialWeb, :view
  alias SocialWeb.MessageView

  def render("index.json", %{messages: messages}) do
    %{data: render_many(messages, MessageView, "message.json")}
  end

  def render("show.json", %{message: message}) do
    %{data: render_one(message, MessageView, "message.json")}
  end

  def render("message.json", %{message: message}) do
    %{id: message.id,
      text: message.text,
      date: message.date,
      sender_name: message.sender_name}
  end
end

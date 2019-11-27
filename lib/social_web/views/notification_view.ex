defmodule SocialWeb.NotificationView do
  use SocialWeb, :view
  alias SocialWeb.NotificationView

  def render("index.json", %{notifications: notifications}) do
    %{data: render_many(notifications, NotificationView, "notification.json")}
  end

  def render("show.json", %{notification: notification}) do
    %{data: render_one(notification, NotificationView, "notification.json")}
  end

  def render("notification.json", %{notification: notification}) do
    %{associated_sender_id: notification.associated_sender_id,
      receiver_id: notification.receiver_id,
      status: notification.status,
      text: notification.text,
      type: notification.type,
      id: notification.id}
  end
end

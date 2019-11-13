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
    %{id: notification.id,
      text: notification.text,
      date: notification.date,
      type: notification.type}
  end
end

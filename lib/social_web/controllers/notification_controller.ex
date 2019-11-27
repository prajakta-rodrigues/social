defmodule SocialWeb.NotificationController do
  use SocialWeb, :controller

  alias Social.Notifications
  alias Social.Notifications.Notification

  action_fallback SocialWeb.FallbackController

  def index(conn, _params) do
    notifications = Notifications.list_notifications()
    render(conn, "index.json", notifications: notifications)
  end

  def create(conn, %{"notification" => notification_params}) do
    with {:ok, %Notification{} = notification} <- Notifications.create_notification(notification_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.notification_path(conn, :show, notification))
      |> render("show.json", notification: notification)
    end
  end

  def list_notifications(conn, %{"receiver_id" => receiver_id}) do
    notifications = Notifications.list_notifications(receiver_id)
    render(conn, "index.json", notifications: notifications)
  end

  def show(conn, %{"id" => id}) do
    notification = Notifications.get_notification!(id)
    render(conn, "show.json", notification: notification)
  end

  def update(conn, %{"id" => id, "notification" => notification_params}) do
    notification = Notifications.get_notification!(id)

    with {:ok, %Notification{} = notification} <- Notifications.update_notification(notification, notification_params) do
      render(conn, "show.json", notification: notification)
    end
  end

  def delete(conn, %{"id" => id}) do
    notification = Notifications.get_notification!(id)

    with {:ok, %Notification{}} <- Notifications.delete_notification(notification) do
      send_resp(conn, :no_content, "")
    end
  end
end

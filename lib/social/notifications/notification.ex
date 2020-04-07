defmodule Social.Notifications.Notification do
  use Ecto.Schema
  import Ecto.Changeset

  schema "notifications" do
    field :date, :date
    field :text, :string
    field :type, :string
    field :associated_sender_id, :id
    field :receiver_id, :id
    field :status, :string

    timestamps()
  end

  @doc false
  def changeset(notification, attrs) do
    notification
    |> cast(attrs, [:text, :date, :type, :associated_sender_id, :receiver_id, :status])
    |> validate_required([:text, :date, :type, :associated_sender_id, :receiver_id, :status])
  end
end

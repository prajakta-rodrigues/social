defmodule Social.Messages.Message do
  use Ecto.Schema
  import Ecto.Changeset

  schema "messages" do
    field :date, :date
    field :text, :string
    field :sender_id, :id
    field :receiver_id, :id
    field :room, :string
    field :sender_name, :string
    timestamps()
  end

  @doc false
  def changeset(message, attrs) do
    message
    |> cast(attrs, [:text, :date, :sender_id, :room, :sender_name])
    |> validate_required([:text, :date, :sender_id, :room, :sender_name])
  end
end

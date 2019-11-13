defmodule Social.Messages.Message do
  use Ecto.Schema
  import Ecto.Changeset

  schema "messages" do
    field :date, :date
    field :text, :string
    field :sender_id, :id
    field :receiver_id, :id

    timestamps()
  end

  @doc false
  def changeset(message, attrs) do
    message
    |> cast(attrs, [:text, :date])
    |> validate_required([:text, :date])
  end
end

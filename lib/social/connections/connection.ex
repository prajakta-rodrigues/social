defmodule Social.Connections.Connection do
  use Ecto.Schema
  import Ecto.Changeset

  schema "connections" do
    field :status, :string
    field :user1_id, :id
    field :user2_id, :id
    field :requester_id, :id

    timestamps()
  end

  @doc false
  def changeset(connection, attrs) do
    connection
    |> cast(attrs, [:status])
    |> validate_required([:status])
  end
end

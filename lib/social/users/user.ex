defmodule Social.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :dob, :date
    field :email, :string
    field :name, :string
    field :password, :string
    field :username, :string

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :username, :email, :password, :dob, :password_hash])
    |> validate_required([:name, :username, :email, :password, :dob, :password_hash])
  end
end

defmodule Social.Profiles.Profile do
  use Ecto.Schema
  import Ecto.Changeset

  schema "profiles" do
    field :behavior, {:array, :string}
    field :description, :string
    field :interests, :string
    field :qualities, {:array, :string}
    field :request_setting_allow, :string
    belongs_to :user, Social.Users.User

    timestamps()
  end

  @doc false
  def changeset(profile, attrs) do
    profile
    |> cast(attrs, [:request_setting_allow, :interests, :description, :qualities, :behavior, :user_id])
    |> validate_required([:request_setting_allow, :interests, :description, :user_id])
  end
end

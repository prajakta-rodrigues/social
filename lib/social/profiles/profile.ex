defmodule Social.Profiles.Profile do
  use Ecto.Schema
  import Ecto.Changeset

  schema "profiles" do
    field :description, :string
    field :sports, {:array, :string}
    field :interests, {:array, :string}
    field :movies, {:array, :string}
    field :qualities, {:array, :string}
    field :request_setting_allow, :string
    belongs_to :user, Social.Users.User

    timestamps()
  end

  @doc false
  def changeset(profile, attrs) do
    profile
    |> cast(attrs, [:request_setting_allow, :interests, :description, :movies, :sports, :user_id])
    |> validate_required([:interests, :description, :user_id])
  end
end

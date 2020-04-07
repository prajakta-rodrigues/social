defmodule Social.Posts.Post do
  use Ecto.Schema
  import Ecto.Changeset

  schema "posts" do
    field :media_id, :string
    field :media_type, :string
    field :media_url, :string

    belongs_to :user, Social.Users.User

    timestamps()
  end

  @doc false
  def changeset(post, attrs) do
    post
    |> cast(attrs, [:media_id, :media_url, :media_type, :user_id])
    |> validate_required([:media_id, :media_url, :media_type])
  end
end

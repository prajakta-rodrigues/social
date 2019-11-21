defmodule Social.Posts.Post do
  use Ecto.Schema
  import Ecto.Changeset

  schema "posts" do
    field :media_id, :string
    field :media_type, :string
    field :media_url, :string
    field :user_id, :id

    timestamps()
  end

  @doc false
  def changeset(post, attrs) do
    post
    |> cast(attrs, [:media_id, :media_url, :media_type])
    |> validate_required([:media_id, :media_url, :media_type])
  end
end

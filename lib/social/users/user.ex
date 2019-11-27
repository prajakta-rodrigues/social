defmodule Social.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :dob, :date
    field :email, :string
    field :name, :string
    field :password, :string
    field :username, :string
    field :password_hash, :string
    field :longitude, :float
    field :latitude, :float
    field :profile_picture, :string

    has_many :posts, Social.Posts.Post
    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :username, :email, :password, :dob, :longitude, :latitude, :profile_picture])
    |> hash_password()
    |> validate_required([:name, :username, :email, :dob, :password_hash])
  end

  def updateset(user, attrs) do
    user = user
     |> cast(attrs, [:name, :username, :email, :password_hash, :dob, :longitude, :latitude])
    if(Map.has_key?(user, :password)) do
      user = user |> hash_password()
    else
      user
    end
   end

  def hash_password(cset) do
    pw = get_change(cset, :password)
    change(cset, Argon2.add_hash(pw))
  end
end

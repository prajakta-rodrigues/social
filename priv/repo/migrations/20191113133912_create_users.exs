defmodule Social.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string
      add :username, :string
      add :email, :string
      add :password, :string
      add :dob, :date
      add :password_hash, :string
      add :longitude, :float
      add :latitude, :float
      add :profile_picture, :text
      timestamps()
    end

  end
end

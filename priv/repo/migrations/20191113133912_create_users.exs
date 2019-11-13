defmodule Social.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string
      add :username, :string
      add :email, :string
      add :password, :string
      add :dob, :date

      timestamps()
    end

  end
end

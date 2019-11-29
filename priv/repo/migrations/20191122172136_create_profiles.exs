defmodule Social.Repo.Migrations.CreateProfiles do
  use Ecto.Migration

  def change do
    create table(:profiles) do
      add :request_setting_allow, :string
      add :sports, {:array, :string}
      add :interests, {:array, :string}
      add :movies, {:array, :string}
      add :description, :string
      add :qualities, {:array, :string}
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:profiles, [:user_id])
  end
end

defmodule Social.Repo.Migrations.CreateProfiles do
  use Ecto.Migration

  def change do
    create table(:profiles) do
      add :request_setting_allow, :string
      add :interests, :string
      add :description, :string
      add :qualities, {:array, :string}
      add :behavior, {:array, :string}
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:profiles, [:user_id])
  end
end

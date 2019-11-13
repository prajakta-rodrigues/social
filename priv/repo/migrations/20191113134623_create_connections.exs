defmodule Social.Repo.Migrations.CreateConnections do
  use Ecto.Migration

  def change do
    create table(:connections) do
      add :status, :string
      add :user1_id, references(:users, on_delete: :nothing)
      add :user2_id, references(:users, on_delete: :nothing)
      add :requester_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:connections, [:user1_id])
    create index(:connections, [:user2_id])
    create index(:connections, [:requester_id])
  end
end

defmodule Social.Repo.Migrations.CreateNotifications do
  use Ecto.Migration

  def change do
    create table(:notifications) do
      add :text, :string
      add :date, :date
      add :type, :string
      add :associated_sender_id, references(:users, on_delete: :nothing)
      add :receiver_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:notifications, [:associated_sender_id])
    create index(:notifications, [:receiver_id])
  end
end

defmodule Social.Repo.Migrations.AddRoomId do
  use Ecto.Migration

  def change do
    alter table(:messages) do
      add :room, :string
    end
  end
end

defmodule Social.Repo.Migrations.AddSenderName do
  use Ecto.Migration

  def change do
    alter table(:messages) do
      add :sender_name, :string
    end
  end
end

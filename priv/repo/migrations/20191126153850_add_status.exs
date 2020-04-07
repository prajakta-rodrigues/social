defmodule Social.Repo.Migrations.AddStatus do
  use Ecto.Migration

  def change do
    alter table(:notifications) do
      add :status, :string
    end
  end
end

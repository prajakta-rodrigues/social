defmodule Social.Repo.Migrations.CreateConfigs do
  use Ecto.Migration

  def change do
    create table(:configs) do
      add :property, :string
      add :property_values, {:array, :string}

      timestamps()
    end

  end
end

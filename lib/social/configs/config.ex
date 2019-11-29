defmodule Social.Configs.Config do
  use Ecto.Schema
  import Ecto.Changeset

  schema "configs" do
    field :property, :string
    field :property_values, {:array, :string}

    timestamps()
  end

  @doc false
  def changeset(config, attrs) do
    config
    |> cast(attrs, [:property, :property_values])
    |> validate_required([:property, :property_values])
  end
end

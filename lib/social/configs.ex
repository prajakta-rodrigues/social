defmodule Social.Configs do
  @moduledoc """
  The Configs context.
  """

  import Ecto.Query, warn: false
  alias Social.Repo

  alias Social.Configs.Config

  @doc """
  Returns the list of configs.

  ## Examples

      iex> list_configs()
      [%Config{}, ...]

  """
  def list_configs do
    Repo.all(Config)
  end

  @doc """
  Gets a single config.

  Raises `Ecto.NoResultsError` if the Config does not exist.

  ## Examples

      iex> get_config!(123)
      %Config{}

      iex> get_config!(456)
      ** (Ecto.NoResultsError)

  """
  def get_config!(id), do: Repo.get!(Config, id)

  @doc """
  Creates a config.

  ## Examples

      iex> create_config(%{field: value})
      {:ok, %Config{}}

      iex> create_config(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_config(attrs \\ %{}) do
    %Config{}
    |> Config.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a config.

  ## Examples

      iex> update_config(config, %{field: new_value})
      {:ok, %Config{}}

      iex> update_config(config, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_config(%Config{} = config, attrs) do
    config
    |> Config.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Config.

  ## Examples

      iex> delete_config(config)
      {:ok, %Config{}}

      iex> delete_config(config)
      {:error, %Ecto.Changeset{}}

  """
  def delete_config(%Config{} = config) do
    Repo.delete(config)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking config changes.

  ## Examples

      iex> change_config(config)
      %Ecto.Changeset{source: %Config{}}

  """
  def change_config(%Config{} = config) do
    Config.changeset(config, %{})
  end
end

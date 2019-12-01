defmodule Social.Connections do
  @moduledoc """
  The Connections context.
  """

  import Ecto.Query, warn: false
  alias Social.Repo

  alias Social.Connections.Connection

  @doc """
  Returns the list of connections.

  ## Examples

      iex> list_connections()
      [%Connection{}, ...]

  """
  def list_connections do
    Repo.all(Connection)
  end

  @doc """
  Gets a single connection.

  Raises `Ecto.NoResultsError` if the Connection does not exist.

  ## Examples

      iex> get_connection!(123)
      %Connection{}

      iex> get_connection!(456)
      ** (Ecto.NoResultsError)

  """
  def get_connection!(id), do: Repo.get!(Connection, id)

  @doc """
  Creates a connection.

  ## Examples

      iex> create_connection(%{field: value})
      {:ok, %Connection{}}

      iex> create_connection(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_connection(attrs \\ %{}) do
    IO.inspect(attrs)
    %Connection{}
    |> Connection.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a connection.

  ## Examples

      iex> update_connection(connection, %{field: new_value})
      {:ok, %Connection{}}

      iex> update_connection(connection, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_connection(%Connection{} = connection, attrs) do
    connection
    |> Connection.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Connection.

  ## Examples

      iex> delete_connection(connection)
      {:ok, %Connection{}}

      iex> delete_connection(connection)
      {:error, %Ecto.Changeset{}}

  """
  def delete_connection(%Connection{} = connection) do
    Repo.delete(connection)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking connection changes.

  ## Examples

      iex> change_connection(connection)
      %Ecto.Changeset{source: %Connection{}}

  """
  def change_connection(%Connection{} = connection) do
    Connection.changeset(connection, %{})
  end

  def get_friends(id) do
    Repo.all from c in Connection,
      where: c.user1_id == ^id or c.user2_id == ^id,
      where: c.status == "ACCEPTED"
  end

  def get_friends_or_pending_friends(id) do
    user_id1  = Repo.all from c in Connection,
      where: c.user1_id == ^id,
      select: c.user2_id

    user_id2 = Repo.all from c in Connection,
      where: c.user2_id == ^id,
      select: c.user1_id
    user_id1 ++ user_id2
  end


end

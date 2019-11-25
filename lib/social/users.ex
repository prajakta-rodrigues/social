defmodule Social.Users do
  @moduledoc """
  The Users context.
  """

  import Ecto.Query, warn: false
  alias Social.Repo

  alias Social.Users.User

  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users()
      [%User{}, ...]

  """
  def list_users do
    Repo.all(User)
  end


  def get_recommended_users(id) do
    user = get_user!(id)
    query = from u in User,
            where: u.id != ^id and u.longitude < ^(user.longitude + 0.5)
            and u.longitude > ^(user.longitude - 0.5)
            and u.latitude < ^(user.latitude + 0.5)
            and u.latitude > ^(user.latitude - 0.5)
    Repo.all(query)
  end

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user!(id), do: Repo.get!(User, id)

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.updateset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a User.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{source: %User{}}

  """
  def change_user(%User{} = user) do
    User.changeset(user, %{})
  end

  def get_user_by_email(email) do
    user = Repo.all from u in User,
            where: u.email == ^email

    if length(user) > 0 do
      true
    else
      false
    end
  end

  def authenticate(email, password) do
    user = Repo.get_by(User, email: email)

    case Argon2.check_pass(user, password) do
      {:ok, user} -> user
      _ -> nil
    end
  end

  def get_by_email(email) do
    Repo.get_by(User, email: email)
  end
end

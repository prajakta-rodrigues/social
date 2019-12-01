defmodule Social.Users do
  @moduledoc """
  The Users context.
  """

  import Ecto.Query, warn: false
  alias Social.Repo

  alias Social.Users.User
  alias Social.Profiles.Profile
  alias SocialWeb.ProfileView
  alias Social.Connections


  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users()
      [%User{}, ...]

  """
  def list_users do
    Repo.all(User)
  end

  def isMatch(a, b) do
    if(length(a -- b) == length(a)) do
      false
    else
      true
    end
  end


  def get_profile_matches(id) do
    users = []
    query1 = from p in Profile,
             where: p.user_id == ^id
    user_profile = Repo.all(query1)
    if(length(user_profile)!= 0) do
       user_profile = user_profile |> Enum.at(0)
       query2 = from p in Profile,
                where: p.user_id != ^id
       profiles = Repo.all(query2)

      selectedSports = Enum.filter(profiles, fn p ->
      isMatch(p.sports, user_profile.sports) end)

      selectedInterests = Enum.filter(profiles, fn p ->
      isMatch(p.interests, user_profile.interests) end)

      selectedMovies = Enum.filter(profiles, fn p ->
      isMatch(p.movies, user_profile.movies) end)




      ping = ProfileView.render("index.json", %{profiles:
      selectedSports ++ selectedInterests ++ selectedMovies})
      IO.inspect(ping)
      ids = ping.data |> Enum.map(fn x -> x.user_id end)
      IO.inspect(ids)
      IO.puts("random")
      query3 = from u in User,
               limit: 5,
                where: u.id in ^ids
      users = Repo.all(query3)
      IO.puts("users")
      IO.inspect(users)
       users
    else
      users
    end
  end

  def get_recommended_users(id) do
    user = get_user!(id)
    existing = Connections.get_friends_or_pending_friends(id)
    query0 = from u in User,
              where: u.id in ^existing
    existing_req = Repo.all(query0)


    IO.inspect(existing)
    profile_users = get_profile_matches(id)
    query = from u in User,
            limit: 5,
            where: u.id != ^id and u.longitude < ^(user.longitude + 0.5)
            and u.longitude > ^(user.longitude - 0.5)
            and u.latitude < ^(user.latitude + 0.5)
            and u.latitude > ^(user.latitude - 0.5)
    matched_users = Repo.all(query) ++ profile_users
    matched_users -- existing_req
  end

  def get_search_users(id, q) do
    s = q <> "%"
    IO.puts(s)
    query = from u in User,
            where: u.id != ^id and ilike(u.name, ^s)
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

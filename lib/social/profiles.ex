defmodule Social.Profiles do
  @moduledoc """
  The Profiles context.
  """

  import Ecto.Query, warn: false
  alias Social.Repo
  alias Social.Users.User
  alias Social.Profiles.Profile

  @doc """
  Returns the list of profiles.

  ## Examples

      iex> list_profiles()
      [%Profile{}, ...]

  """
  def list_profiles do
    Repo.all(Profile)
  end

  @doc """
  Gets a single profile.

  Raises `Ecto.NoResultsError` if the Profile does not exist.

  ## Examples

      iex> get_profile!(123)
      %Profile{}

      iex> get_profile!(456)
      ** (Ecto.NoResultsError)

  """
  def get_profile!(id), do: Repo.get!(Profile, id)

  def get_profile_by_user_id!(user_id) do
    profile = Repo.all from p in Profile,
            where: p.user_id == ^user_id
    profile |> Enum.at(0)
  end

  @doc """
  Creates a profile.

  ## Examples

      iex> create_profile(%{field: value})
      {:ok, %Profile{}}

      iex> create_profile(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_profile(attrs \\ %{}) do
    # user = Repo.get!(User, attrs["user_id"])
    # resp = HTTPoison.get!("https://api.crystalknows.com/v1/personality_assessments/"
    # <> "find?token=1a613c04defd06c13683629d55d91b3c&email=" <> user.email)
    # IO.inspect(resp.body)
    # {:ok, body} = Jason.decode(resp.body)
    # IO.inspect(body["content"]["behavior"]["phrases"])
    # IO.inspect(body["content"]["profile"]["qualities"])
    # behavior = body["content"]["behavior"]["phrases"] || []
    # qualities = body["content"]["profile"]["qualities"] || []
    # IO.inspect(attrs)
    # attrs = Map.put(attrs, "behavior", behavior)
    # attrs = Map.put(attrs, "qualities", qualities)
    IO.inspect(attrs)
    %Profile{}
    |> Profile.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a profile.

  ## Examples

      iex> update_profile(profile, %{field: new_value})
      {:ok, %Profile{}}

      iex> update_profile(profile, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_profile(%Profile{} = profile, attrs) do
    profile
    |> Profile.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Profile.

  ## Examples

      iex> delete_profile(profile)
      {:ok, %Profile{}}

      iex> delete_profile(profile)
      {:error, %Ecto.Changeset{}}

  """
  def delete_profile(%Profile{} = profile) do
    Repo.delete(profile)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking profile changes.

  ## Examples

      iex> change_profile(profile)
      %Ecto.Changeset{source: %Profile{}}

  """
  def change_profile(%Profile{} = profile) do
    Profile.changeset(profile, %{})
  end

  def get_popular_interests() do
    user_interests = Repo.all from p in Profile,
                limit: 40,
                select: p.interests
    IO.inspect(user_interests)
    interests = Enum.reduce(user_interests, [] , fn(item, acc) -> acc ++ item end)

    counts = Enum.reduce(interests, %{}, fn(item, acc) ->  acc |>
    Map.put(item, Enum.count(interests, &(&1 == item))) end )

    Enum.reduce(counts, [],  fn ({k,v}, acc)
    -> acc ++ [%{value: k, count: v}] end)
  end
end

defmodule SocialWeb.ProfileController do
  use SocialWeb, :controller

  alias Social.Profiles
  alias Social.Profiles.Profile

  action_fallback SocialWeb.FallbackController

  def index(conn, _params) do
    profiles = Profiles.list_profiles()
    render(conn, "index.json", profiles: profiles)
  end

  def create(conn, %{"profile" => profile_params}) do
    with {:ok, %Profile{} = profile} <- Profiles.create_profile(profile_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.profile_path(conn, :show, profile))
      |> render("show.json", profile: profile)
    else
      err ->
        IO.inspect(err)
        resp = %{errors: ["Some errors with given data"]}
        conn
        |> put_resp_header("content-type", "application/json; charset=UTF-8")
        |> send_resp(500, Jason.encode!(resp))
      end
  end

  def show(conn, %{"id" => id}) do
    profile = Profiles.get_profile!(id)
    render(conn, "show.json", profile: profile)
  end

  def update(conn, %{"id" => id, "profile" => profile_params}) do
    profile = Profiles.get_profile!(id)

    with {:ok, %Profile{} = profile} <- Profiles.update_profile(profile, profile_params) do
      render(conn, "show.json", profile: profile)
    end
  end

  def delete(conn, %{"id" => id}) do
    profile = Profiles.get_profile!(id)

    with {:ok, %Profile{}} <- Profiles.delete_profile(profile) do
      send_resp(conn, :no_content, "")
    end
  end

  def get_user_profile(conn, %{"id" => id}) do
    IO.inspect(id)
    IO.puts("jinga")
    profile = Profiles.get_profile_by_user_id!(id)
    render(conn, "show.json", profile: profile)
  end

end

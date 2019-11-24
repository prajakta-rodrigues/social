defmodule SocialWeb.ProfileView do
  use SocialWeb, :view
  alias SocialWeb.ProfileView

  def render("index.json", %{profiles: profiles}) do
    %{data: render_many(profiles, ProfileView, "profile.json")}
  end

  def render("show.json", %{profile: profile}) do
    %{data: render_one(profile, ProfileView, "profile.json")}
  end

  def render("profile.json", %{profile: profile}) do
    %{id: profile.id,
      request_setting_allow: profile.request_setting_allow,
      interests: profile.interests,
      description: profile.description,
      qualities: profile.qualities,
      behavior: profile.behavior}
  end
end

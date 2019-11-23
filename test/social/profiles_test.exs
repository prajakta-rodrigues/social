defmodule Social.ProfilesTest do
  use Social.DataCase

  alias Social.Profiles

  describe "profiles" do
    alias Social.Profiles.Profile

    @valid_attrs %{behavior: [], description: "some description", interests: [], qualities: [], request_setting_allow: "some request_setting_allow"}
    @update_attrs %{behavior: [], description: "some updated description", interests: [], qualities: [], request_setting_allow: "some updated request_setting_allow"}
    @invalid_attrs %{behavior: nil, description: nil, interests: nil, qualities: nil, request_setting_allow: nil}

    def profile_fixture(attrs \\ %{}) do
      {:ok, profile} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Profiles.create_profile()

      profile
    end

    test "list_profiles/0 returns all profiles" do
      profile = profile_fixture()
      assert Profiles.list_profiles() == [profile]
    end

    test "get_profile!/1 returns the profile with given id" do
      profile = profile_fixture()
      assert Profiles.get_profile!(profile.id) == profile
    end

    test "create_profile/1 with valid data creates a profile" do
      assert {:ok, %Profile{} = profile} = Profiles.create_profile(@valid_attrs)
      assert profile.behavior == []
      assert profile.description == "some description"
      assert profile.interests == []
      assert profile.qualities == []
      assert profile.request_setting_allow == "some request_setting_allow"
    end

    test "create_profile/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Profiles.create_profile(@invalid_attrs)
    end

    test "update_profile/2 with valid data updates the profile" do
      profile = profile_fixture()
      assert {:ok, %Profile{} = profile} = Profiles.update_profile(profile, @update_attrs)
      assert profile.behavior == []
      assert profile.description == "some updated description"
      assert profile.interests == []
      assert profile.qualities == []
      assert profile.request_setting_allow == "some updated request_setting_allow"
    end

    test "update_profile/2 with invalid data returns error changeset" do
      profile = profile_fixture()
      assert {:error, %Ecto.Changeset{}} = Profiles.update_profile(profile, @invalid_attrs)
      assert profile == Profiles.get_profile!(profile.id)
    end

    test "delete_profile/1 deletes the profile" do
      profile = profile_fixture()
      assert {:ok, %Profile{}} = Profiles.delete_profile(profile)
      assert_raise Ecto.NoResultsError, fn -> Profiles.get_profile!(profile.id) end
    end

    test "change_profile/1 returns a profile changeset" do
      profile = profile_fixture()
      assert %Ecto.Changeset{} = Profiles.change_profile(profile)
    end
  end
end

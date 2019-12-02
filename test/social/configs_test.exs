defmodule Social.ConfigsTest do
  use Social.DataCase

  alias Social.Configs

  describe "configs" do
    alias Social.Configs.Config

    @valid_attrs %{interests: [], "movies-genre": [], "music-genre": [], sports: []}
    @update_attrs %{interests: [], "movies-genre": [], "music-genre": [], sports: []}
    @invalid_attrs %{interests: nil, "movies-genre": nil, "music-genre": nil, sports: nil}

    def config_fixture(attrs \\ %{}) do
      {:ok, config} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Configs.create_config()

      config
    end

    test "list_configs/0 returns all configs" do
      config = config_fixture()
      assert Configs.list_configs() == [config]
    end

    test "get_config!/1 returns the config with given id" do
      config = config_fixture()
      assert Configs.get_config!(config.id) == config
    end

    test "create_config/1 with valid data creates a config" do
      assert {:ok, %Config{} = config} = Configs.create_config(@valid_attrs)
      assert config.interests == []
      assert config.movies-genre == []
      assert config.music-genre == []
      assert config.sports == []
    end

    test "create_config/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Configs.create_config(@invalid_attrs)
    end

    test "update_config/2 with valid data updates the config" do
      config = config_fixture()
      assert {:ok, %Config{} = config} = Configs.update_config(config, @update_attrs)
      assert config.interests == []
      assert config.movies-genre == []
      assert config.music-genre == []
      assert config.sports == []
    end

    test "update_config/2 with invalid data returns error changeset" do
      config = config_fixture()
      assert {:error, %Ecto.Changeset{}} = Configs.update_config(config, @invalid_attrs)
      assert config == Configs.get_config!(config.id)
    end

    test "delete_config/1 deletes the config" do
      config = config_fixture()
      assert {:ok, %Config{}} = Configs.delete_config(config)
      assert_raise Ecto.NoResultsError, fn -> Configs.get_config!(config.id) end
    end

    test "change_config/1 returns a config changeset" do
      config = config_fixture()
      assert %Ecto.Changeset{} = Configs.change_config(config)
    end
  end

  describe "configs" do
    alias Social.Configs.Config

    @valid_attrs %{interests: [], movies_genre: [], music_genre: [], sports: []}
    @update_attrs %{interests: [], movies_genre: [], music_genre: [], sports: []}
    @invalid_attrs %{interests: nil, movies_genre: nil, music_genre: nil, sports: nil}

    def config_fixture(attrs \\ %{}) do
      {:ok, config} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Configs.create_config()

      config
    end

    test "list_configs/0 returns all configs" do
      config = config_fixture()
      assert Configs.list_configs() == [config]
    end

    test "get_config!/1 returns the config with given id" do
      config = config_fixture()
      assert Configs.get_config!(config.id) == config
    end

    test "create_config/1 with valid data creates a config" do
      assert {:ok, %Config{} = config} = Configs.create_config(@valid_attrs)
      assert config.interests == []
      assert config.movies_genre == []
      assert config.music_genre == []
      assert config.sports == []
    end

    test "create_config/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Configs.create_config(@invalid_attrs)
    end

    test "update_config/2 with valid data updates the config" do
      config = config_fixture()
      assert {:ok, %Config{} = config} = Configs.update_config(config, @update_attrs)
      assert config.interests == []
      assert config.movies_genre == []
      assert config.music_genre == []
      assert config.sports == []
    end

    test "update_config/2 with invalid data returns error changeset" do
      config = config_fixture()
      assert {:error, %Ecto.Changeset{}} = Configs.update_config(config, @invalid_attrs)
      assert config == Configs.get_config!(config.id)
    end

    test "delete_config/1 deletes the config" do
      config = config_fixture()
      assert {:ok, %Config{}} = Configs.delete_config(config)
      assert_raise Ecto.NoResultsError, fn -> Configs.get_config!(config.id) end
    end

    test "change_config/1 returns a config changeset" do
      config = config_fixture()
      assert %Ecto.Changeset{} = Configs.change_config(config)
    end
  end

  describe "configs" do
    alias Social.Configs.Config

    @valid_attrs %{property: "some property", property_values: []}
    @update_attrs %{property: "some updated property", property_values: []}
    @invalid_attrs %{property: nil, property_values: nil}

    def config_fixture(attrs \\ %{}) do
      {:ok, config} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Configs.create_config()

      config
    end

    test "list_configs/0 returns all configs" do
      config = config_fixture()
      assert Configs.list_configs() == [config]
    end

    test "get_config!/1 returns the config with given id" do
      config = config_fixture()
      assert Configs.get_config!(config.id) == config
    end

    test "create_config/1 with valid data creates a config" do
      assert {:ok, %Config{} = config} = Configs.create_config(@valid_attrs)
      assert config.property == "some property"
      assert config.property_values == []
    end

    test "create_config/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Configs.create_config(@invalid_attrs)
    end

    test "update_config/2 with valid data updates the config" do
      config = config_fixture()
      assert {:ok, %Config{} = config} = Configs.update_config(config, @update_attrs)
      assert config.property == "some updated property"
      assert config.property_values == []
    end

    test "update_config/2 with invalid data returns error changeset" do
      config = config_fixture()
      assert {:error, %Ecto.Changeset{}} = Configs.update_config(config, @invalid_attrs)
      assert config == Configs.get_config!(config.id)
    end

    test "delete_config/1 deletes the config" do
      config = config_fixture()
      assert {:ok, %Config{}} = Configs.delete_config(config)
      assert_raise Ecto.NoResultsError, fn -> Configs.get_config!(config.id) end
    end

    test "change_config/1 returns a config changeset" do
      config = config_fixture()
      assert %Ecto.Changeset{} = Configs.change_config(config)
    end
  end
end

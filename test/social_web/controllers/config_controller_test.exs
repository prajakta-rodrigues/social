defmodule SocialWeb.ConfigControllerTest do
  use SocialWeb.ConnCase

  alias Social.Configs
  alias Social.Configs.Config

  @create_attrs %{
    property: "some property",
    property_values: []
  }
  @update_attrs %{
    property: "some updated property",
    property_values: []
  }
  @invalid_attrs %{property: nil, property_values: nil}

  def fixture(:config) do
    {:ok, config} = Configs.create_config(@create_attrs)
    config
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all configs", %{conn: conn} do
      conn = get(conn, Routes.config_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create config" do
    test "renders config when data is valid", %{conn: conn} do
      conn = post(conn, Routes.config_path(conn, :create), config: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.config_path(conn, :show, id))

      assert %{
               "id" => id,
               "property" => "some property",
               "property_values" => []
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.config_path(conn, :create), config: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update config" do
    setup [:create_config]

    test "renders config when data is valid", %{conn: conn, config: %Config{id: id} = config} do
      conn = put(conn, Routes.config_path(conn, :update, config), config: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.config_path(conn, :show, id))

      assert %{
               "id" => id,
               "property" => "some updated property",
               "property_values" => []
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, config: config} do
      conn = put(conn, Routes.config_path(conn, :update, config), config: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete config" do
    setup [:create_config]

    test "deletes chosen config", %{conn: conn, config: config} do
      conn = delete(conn, Routes.config_path(conn, :delete, config))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.config_path(conn, :show, config))
      end
    end
  end

  defp create_config(_) do
    config = fixture(:config)
    {:ok, config: config}
  end
end

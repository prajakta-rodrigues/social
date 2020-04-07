defmodule SocialWeb.ConfigController do
  use SocialWeb, :controller

  alias Social.Configs
  alias Social.Configs.Config

  action_fallback SocialWeb.FallbackController

  def index(conn, _params) do
    configs = Configs.list_configs()
    render(conn, "index.json", configs: configs)
  end

  def create(conn, %{"config" => config_params}) do
    with {:ok, %Config{} = config} <- Configs.create_config(config_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.config_path(conn, :show, config))
      |> render("show.json", config: config)
    end
  end

  def show(conn, %{"id" => id}) do
    config = Configs.get_config!(id)
    render(conn, "show.json", config: config)
  end

  def update(conn, %{"id" => id, "config" => config_params}) do
    config = Configs.get_config!(id)

    with {:ok, %Config{} = config} <- Configs.update_config(config, config_params) do
      render(conn, "show.json", config: config)
    end
  end

  def delete(conn, %{"id" => id}) do
    config = Configs.get_config!(id)

    with {:ok, %Config{}} <- Configs.delete_config(config) do
      send_resp(conn, :no_content, "")
    end
  end
end

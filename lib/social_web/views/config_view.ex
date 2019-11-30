defmodule SocialWeb.ConfigView do
  use SocialWeb, :view
  alias SocialWeb.ConfigView

  def render("index.json", %{configs: configs}) do
    %{data: render_many(configs, ConfigView, "config.json")}
  end

  def render("show.json", %{config: config}) do
    %{data: render_one(config, ConfigView, "config.json")}
  end

  def render("config.json", %{config: config}) do
    %{id: config.id,
      property: config.property,
      property_values: config.property_values}
  end
end

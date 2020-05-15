defmodule AtterstaggeWeb.PageController do
  use AtterstaggeWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end

defmodule AtterstaggeWeb.Identifier do
  import Plug.Conn

  def init(opts), do: opts

  def call(conn, _opts) do
    case get_session(conn, :user_id) do
      nil ->
        user_id = UUID.uuid4()
        conn
        |> assign(:user_id, user_id)
        |> put_session(:user_id, user_id)
        |> configure_session(renew: true)

      user_id ->
        assign(conn, :user_id, user_id)
    end
  end
end

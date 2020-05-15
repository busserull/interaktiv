defmodule Atterstagge.Repo do
  use Ecto.Repo,
    otp_app: :atterstagge,
    adapter: Ecto.Adapters.Postgres
end

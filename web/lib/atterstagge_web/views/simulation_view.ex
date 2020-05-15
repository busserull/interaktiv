defmodule AtterstaggeWeb.SimulationView do
  use AtterstaggeWeb, :view

  defp latex_units({[], []}) do
    "$1$"
  end

  defp latex_units({[], denominator}) do
    "$1/" <> latex_math(denominator) <> "$"
  end

  defp latex_units({numerator, []}) do
    "$" <> latex_math(numerator) <> "$"
  end

  defp latex_units({numerator, denominator}) do
    "$" <> latex_math(numerator) <> "/" <> latex_math(denominator) <> "$"
  end

  defp latex_math(units) when is_list(units) do
    units
    |> Enum.map(&(latex_math(&1)))
    |> Enum.join("\\cdot")
  end

  defp latex_math({unit, 1}) do
    "\\mathrm{#{unit}}"
  end

  defp latex_math({unit, power}) do
    "\\mathrm{#{unit}}^#{power}"
  end
end

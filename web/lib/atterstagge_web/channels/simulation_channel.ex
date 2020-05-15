defmodule AtterstaggeWeb.SimulationChannel do
  use Phoenix.Channel, log: :info
  import Phoenix.Socket, only: [assign: 3]
  alias Atterstagge.Simulator
  alias AtterstaggeWeb.Endpoint

  def join("simulation:" <> user_id, _payload, socket) do
    case Atterstagge.SimulatorPool.new(user_id, self(), "") do
      {:ok, pid} ->
        {:ok, assign(socket, :simulator, pid)}

      {:error, reason} ->
        {:error, %{reason: reason}}
    end
  end

  def handle_in("init", plant_params, socket) do
    Simulator.init_plant socket.assigns.simulator, plant_params
    send self(), {:after_plant_init, plant_params}
    {:noreply, socket}
  end

  def handle_in("start", _payload, socket) do
    Simulator.start_plant socket.assigns.simulator
    {:noreply, socket}
  end

  def handle_in("force", force_vector, socket) do
    Simulator.force_plant socket.assigns.simulator, force_vector
    {:noreply, socket}
  end

  def handle_in("stop", _payload, socket) do
    Simulator.stop_plant socket.assigns.simulator
    {:noreply, socket}
  end

  def handle_in("terminate", _payload, socket) do
    Simulator.terminate_plant socket.assigns.simulator
    {:noreply, socket}
  end

  def handle_info({:after_plant_init, plant_params}, socket) do
    Endpoint.broadcast! socket.topic, "state", Map.get(plant_params, "init")
    {:noreply, socket}
  end
end

defmodule Atterstagge.Simulator do
  use GenServer
  alias AtterstaggeWeb.Endpoint

  def start(channel, system) do
    GenServer.start __MODULE__, [channel, system]
  end

  def init_plant(pid, params \\ %{}) do
    GenServer.call pid, {:init, params}
  end

  def start_plant(pid) do
    GenServer.call pid, :start
  end

  def force_plant(pid, u \\ []) do
    GenServer.call pid, {:force, u}
  end

  def stop_plant(pid) do
    GenServer.call pid, :stop
  end

  def terminate_plant(pid) do
    GenServer.call pid, :terminate
  end

  ## Callbacks

  def init([channel, _system]) do
    simulator = "/home/austreng/atterstagge/simulation/numerical/simulator"
    opts = [:binary, args: []]

    port = Port.open {:spawn_executable, simulator}, opts

    plant_params = %{
      plant: "mass_damper_spring",
      step_ms: 100,
      init: %{
        t: 0.0,
        x: [2.0, 0.0],
        u: [0.0, 0.0]
      },
      params: %{
        mass: 1.0,
        damper: 0.1,
        spring: 1.0
      }
    }

    command_plant(port, "init", plant_params)

    state = %{
      port: port,
      channel: channel
    }

    {:ok, state}
  end

  def handle_call({:init, params}, _from, state) do
    command_plant state.port, "init", params
    {:reply, :ok, state}
  end

  def handle_call(:start, _from, state) do
    command_plant state.port, "start", %{}
    {:reply, :ok, state}
  end

  def handle_call({:force, u}, _from, state) do
    command_plant state.port, "force", %{u: u}
    {:reply, :ok, state}
  end

  def handle_call(:stop, _from, state) do
    command_plant state.port, "stop", %{}
    {:reply, :ok, state}
  end

  def handle_call(:terminate, _from, state) do
    command_plant state.port, "terminate", %{}
    {:reply, :ok, state}
  end

  def handle_info({_port, {:data, json}}, state) do
    simulation = Jason.decode! json

    channel = "simulation:#{state.channel}"
    Endpoint.broadcast channel, "state", simulation

    {:noreply, state}
  end

  # Helpers

  defp command_plant(port, command, payload) do
    command_enc = payload
      |> Map.put(:command, command)
      |> Jason.encode!()

    Port.command port, "#{command_enc}\n"
  end
end

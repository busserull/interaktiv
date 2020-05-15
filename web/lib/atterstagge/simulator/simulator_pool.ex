defmodule Atterstagge.SimulatorPool do
  use GenServer

  def start_link(_opts \\ []) do
    GenServer.start_link __MODULE__, :ok, name: __MODULE__
  end

  def new(channel_id, channel_pid, system) do
    GenServer.call __MODULE__, {:new, channel_id, channel_pid, system}
  end

  # Callbacks

  def init(:ok) do
    state = %{
      channels: %{},
      monitors: %{}
    }

    {:ok, state}
  end

  def handle_call({:new, channel_id, channel_pid, system}, _from, state) do
    %{channels: ids, monitors: refs} = state

    case Map.has_key?(ids, channel_id) do
      true ->
        {:reply, {:error, :already_running}, state}

      false ->
        {:ok, sim_pid} = Atterstagge.Simulator.start(channel_id, system)
        channel_ref = Process.monitor(channel_pid)

        new_state = %{
          channels: Map.put(ids, channel_id, sim_pid),
          monitors: Map.put(refs, channel_ref, channel_id)
        }

        {:reply, {:ok, sim_pid}, new_state}
    end
  end

  def handle_info({:DOWN, ref, :process, _pid, _reason}, state) do
    %{channels: ids, monitors: refs} = state
    channel_id = Map.get(refs, ref)
    sim_pid = Map.get(ids, channel_id)
    Process.exit(sim_pid, :kill)

    new_state = %{
      channels: Map.delete(ids, channel_id),
      monitors: Map.delete(refs, ref)
    }

    {:noreply, new_state}
  end
end

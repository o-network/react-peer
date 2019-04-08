import useConnectionReducer from "../connection/use-connection-reducer";
import useEvent from "../use-event";
import usePeer from "./use-peer";

export default function useConnections(suppliedPeer = undefined) {
  const contextPeer = usePeer();
  const peer = suppliedPeer || contextPeer.peer;
  const [connections, onConnection] = useConnectionReducer(
    peer ? (
      // Load up all those initial connections
      Object.keys(peer.connections)
        .reduce(
          (all, next) => all.concat(next),
          []
        )
    ) : []
  );
  useEvent(
    "connection",
    peer,
    connection => onConnection(connection)
  );
  return connections;
}

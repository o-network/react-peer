import {createElement, useEffect, useMemo, useState} from "react";
import ContextPrototype from "./context.js";
import usePeer from "../peer/use-peer";
import {STATUS_PEERED, STATUS_PEERING} from "./status";

export function createConnection(suppliedConnection = undefined, id = undefined, options = undefined) {
  const { peer, status: peerStatus, id: peerId } = usePeer();
  const peerUnusable = peer.disconnected || peer.destroyed;
  const [status, setStatus] = useState(peerUnusable ? peerStatus : STATUS_PEERING);
  // We can connect early, but not if the peer is disconnected
  const connection = useMemo(() => {
    if (peerUnusable) return undefined;
    if (suppliedConnection) return suppliedConnection;
    if (!id) return undefined;
    return peer.connect(id, options);
  }, [peerUnusable, peer, id, options, suppliedConnection]);

  function onOpen() {
    setStatus(STATUS_PEERED);
  }

  useEffect(() => {
    if (!connection) {
      return;
    }
    if (connection.open) {
      onOpen();
    }
    connection.on('open', onOpen);
    return () => {
      connection.removeListener("open", onOpen);
    }
  });

  return {
    peerStatus,
    peerId,
    peer,
    status: peerUnusable ? peerStatus : status,
    connection
  }
}

export default function ConnectionProvider({ connection: suppliedConnection = undefined, id = undefined, options = undefined, children }) {
  const value = createConnection(suppliedConnection, id, options);
  return createElement(
    ContextPrototype.Provider,
    {
      value
    },
    children
  );
}

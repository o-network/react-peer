import { memo, createElement, useEffect, useMemo, useState } from "react";
import ContextPrototype from "./context.js";
import Peer from "peerjs";
import { STATUS_CLOSED, STATUS_DISCONNECTED, STATUS_INITIALIZING, STATUS_READY } from "./status";
import useEvent from "../use-event";

export function createPeer(suppliedPeer = undefined, id = undefined, options = undefined) {
  const peer = useMemo(() => suppliedPeer || new Peer(id, options), [suppliedPeer, id, options]);
  const [status, setStatus] = useState(STATUS_INITIALIZING);
  const [peerId, setId] = useState(id);

  function onReady(id = peer.id) {
    setId(id);
    setStatus(STATUS_READY);
  }

  function onDisconnected() {
    setStatus(STATUS_DISCONNECTED);
  }

  function onClosed() {
    setStatus(STATUS_CLOSED);
  }

  useEffect(() => {
    if (peer && peer.destroyed) {
      onClosed();
    } else if (peer && peer.disconnected) {
      onDisconnected();
    } else if (peer && peer.id) {
      onReady();
    }
  });

  useEvent(
    [
      "open",
      "disconnected",
      "close"
    ],
    peer,
    (unused, event) => {
      switch (event) {
        case "open": return onReady();
        case "disconnected": return onDisconnected();
        case "close": return onClosed();
      }
    }
  );

  return {
    status,
    peer,
    id: peerId
  }
}

export default memo(function PeerProvider({ peer: suppliedPeer = undefined, id = undefined, options = undefined, children }) {
  const value = createPeer(suppliedPeer, id, options);
  return createElement(
    ContextPrototype.Provider,
    {
      value
    },
    children
  );
})

import {createElement, useEffect, useMemo, useState} from "react";
import ContextPrototype from "./context.js";
import Peer from "peerjs";
import { STATUS_CLOSED, STATUS_DISCONNECTED, STATUS_INITIALIZING, STATUS_READY } from "./status";

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

  // We want to be able to clean up after
  useEffect(() => {
    if (peer.destroyed) {
      onClosed();
    } else if (peer.disconnected) {
      onDisconnected();
    } else if (peer.id) {
      onReady();
    }
    peer.on("open", onReady);
    peer.on("disconnected", onDisconnected);
    peer.on("close", onClosed);
    return () => {
      peer.removeListener("open", onReady);
      peer.removeListener("disconnected", onDisconnected);
      peer.removeListener("close", onClosed);
    }
  });

  return {
    status,
    peer,
    id: peerId
  }
}

export default function ({ peer: suppliedPeer = undefined, id = undefined, options = undefined, children }) {
  const value = createPeer(suppliedPeer, id, options);
  return createElement(
    ContextPrototype.Provider,
    {
      value
    },
    children
  );
}

import { memo, createElement, forwardRef, useContext } from "react";
import ConnectionContext from "./context.js";

export default (Component) => {
  return memo(forwardRef((props, ref) => {
    const { peer, peerStatus, peerId, connection, status: connectionStatus } = useContext(ConnectionContext);
    return createElement(
      Component,
      {
        ...props,
        peer,
        peerStatus,
        peerId,
        connection,
        connectionStatus,
        ref
      }
    );
  }));
}

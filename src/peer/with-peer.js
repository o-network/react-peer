import { memo, createElement, forwardRef, useContext } from "react";
import PeerContext from "./context.js";

export default (Component) => {
  return memo(forwardRef((props, ref) => {
    const { peer, status: peerStatus, id: peerId } = useContext(PeerContext);
    return createElement(
      Component,
      {
        ...props,
        peer,
        peerStatus,
        peerId,
        ref
      }
    );
  }));
}

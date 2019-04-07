import PeerContext from "./context.js";

export { STATUS_READY, STATUS_INITIALIZING, STATUS_DISCONNECTED, STATUS_CLOSED } from "./status.js";
export PeerProvider, { createPeer } from "./peer-provider.js";
export usePeer from "./use-peer.js";
export withPeer from "./with-peer.js";

export const PeerConsumer = PeerContext.Consumer;

export {
  PeerContext
}

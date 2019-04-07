import { createContext } from "react";
import { STATUS_INITIALIZING } from "../peer/status.js";

export default createContext({ connection: undefined, peerId: undefined, peer: undefined, peerStatus: STATUS_INITIALIZING, status: STATUS_INITIALIZING });

import { createContext } from "react";
import { STATUS_INITIALIZING } from "./status.js";

export default createContext({ peer: undefined, id: undefined, status: STATUS_INITIALIZING });

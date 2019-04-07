import { useContext } from "react";
import Context from "./context.js";

export default function usePeer() {
  return useContext(Context);
}

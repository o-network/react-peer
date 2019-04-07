import { useContext } from "react";
import Context from "./context.js";

export default function useConnection() {
  return useContext(Context);
}

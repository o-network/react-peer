import useEvent from "../use-event";
import useConnection from "./use-connection";

export default function(onData, suppliedConnection = undefined) {
  const contextConnection = useConnection();
  const connection = suppliedConnection || contextConnection.connection;
  return useEvent("data", connection, onData);
}

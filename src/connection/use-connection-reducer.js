import { useReducer } from "react";

export default (connections = []) => {
  return useReducer((connections, connection) => {
    const foundIndex = connections.indexOf(connection);
    if (foundIndex > -1) {
      return connections;
    }
    return connections.concat(connection);
  }, connections);
}

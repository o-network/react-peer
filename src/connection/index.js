import ConnectionContext from "./context.js";

export { STATUS_PEERING, STATUS_PEERED } from "./status.js";

export ConnectionProvider, { createConnection } from "./connection-provider.js";
export useConnection from "./use-connection.js";
export withConnection from "./with-connection.js";

export const ConnectionConsumer = ConnectionContext.Consumer;

export {
  ConnectionContext
}

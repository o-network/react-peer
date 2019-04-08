import { createElement, useMemo } from "react";
import { createPeer, PeerProvider, ConnectionProvider, useConnection, STATUS_PEERED, useConnections, useData, withConnection } from '../../src';
import { render } from "react-dom";

const ComponentWithConnectionNoHooks = withConnection(({ connection, connectionStatus }) => {
  return createElement("p", undefined, `No hooks Connection: ${connectionStatus} ${connection ? connection.id : ''}`);
});

const ComponentWithConnection = () => {
  const { status, connection } = useConnection();
  useMemo(() => {
    if (connection && status === STATUS_PEERED) {
      console.log('Sent!');
      connection.send("Hello!");
    }
  }, [status, connection]);
  return createElement("p", undefined, `Connection: ${status} ${connection ? connection.id : ''}`);
};

const App = () => {
  const { peer } = createPeer();
  const { peer: peerOther, id: otherId } = createPeer();

  const connectionsOther = useConnections(peerOther);

  useData(
    (data, connection) => {
      console.log({ connection, data });
    },
    connectionsOther
  );

  return createElement(
    PeerProvider,
    {
      peer
    },
    createElement(
      ConnectionProvider,
      {
        peer,
        id: otherId
      },
      [
        createElement(ComponentWithConnection, { key: 1 }),
        createElement(ComponentWithConnectionNoHooks, { key: 2 })
      ]
    )
  )
};

render(
  createElement(App),
  document.getElementById("demo")
);

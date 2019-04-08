import { createElement, useMemo } from "react";
import { createPeer, PeerProvider, ConnectionProvider, useConnection, STATUS_PEERED, useConnections, useData } from '../../src';
import { render } from "react-dom";

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
      createElement(ComponentWithConnection)
    )
  )
};

render(
  createElement(App),
  document.getElementById("demo")
);

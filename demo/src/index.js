import { createElement, useEffect, useReducer, useMemo } from "react";
import { createPeer, PeerProvider, ConnectionProvider, useConnection, STATUS_PEERED } from '../../src';
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

  const [connections, onConnection] = useReducer((connections, connection) => {
    return connections
      .filter(other => other.id === connection.id)
      .concat(connection);
  }, []);

  useEffect(() => {
    const effects = [];

    connections
      .forEach(connection => {
        const onData = (data) => {
          console.log({ connection, data });
        };
        connection.on("data", onData);
        effects.push(() => {
          connection.removeListener("data", onData);
        });
      });

    const onConnectionIgnoreEvent = connection => onConnection(connection);
    peerOther.on("connection", onConnectionIgnoreEvent);
    return () => {
      peerOther.removeListener("connection", onConnectionIgnoreEvent);
      effects.forEach(fn => fn());
    }
  });

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

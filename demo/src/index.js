import { createElement, useEffect } from "react";
import { createPeer, PeerProvider, ConnectionProvider, useConnection } from '../../src';
import { render } from "react-dom";

const ComponentWithConnection = () => {
  const { status, connection } = useConnection();
  useEffect(() => {
    console.log({ connection });
    if (connection) {
      console.log('Send!');
      connection.send("Hello!");
    }
  });
  return createElement("p", undefined, `Connection: ${status} ${connection ? connection.id : ''}`);
};

const App = () => {
  const { peer } = createPeer();
  const { peer: peerOther, id: otherId } = createPeer();

  useEffect(() => {
    const effects = [];

    const onConnection = (connection) => {
      const onData = (data) => {
        console.log({ connection, data });
      };

      connection.on("data", onData);

      effects.push(() => {
        connection.removeListener("data", onData);
      });
    };

    Object.keys(peerOther.connections)
      .forEach(id => peerOther.connections[id].forEach(onConnection));

    peerOther.on("connection", onConnection);

    return () => {
      peerOther.removeListener("connection", onConnection);
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

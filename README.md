# react-peer

## Installation

This module is distributed via [npm](https://www.npmjs.com/) using the module name [`@opennetwork/react-peer`](https://www.npmjs.com/package/@opennetwork/react-peer)

This can be installed using:

```bash
npm install --save @opennetwork/react-peer
```

## Setup

To create connections within your React component you need to first create the `PeerProvider`, 
if no `peer` property is passed then a new pair instance will be created

```js
import React from "react";
import { PeerProvider } from "@opennetwork/react-peer";
import App from "./app";

// This would be your top level component for example
export default () => {
  return (
    <PeerProvider options={{ key: "YOUR API KEY" }}>
      <App />
    </PeerProvider>
  );
}
```

When you have the identifier for a peer you want to connect to, create a connection provider and pass the `id` as a prop:

```js
import React from "react";
import { ConnectionProvider } from "@opennetwork/react-peer";
import WithConnection from "./with-connection";

export default ({ id, options = undefined }) => {
  return (
    <ConnectionProvider id={id} options={options}>
      <WithConnection />
    </ConnectionProvider>
  );
}
``` 

You can also receive new connections from other peers and do something with them, if you pass a `connection`
prop to `ConnectionProvider` instead of `id` and `options`, then that connection will be used instead of creating a new one. 

```js
import React, { useEffect, useReducer, Fragment } from "react";
import { ConnectionProvider, usePeer } from "@opennetwork/react-peer";
import WithConnection from "./with-connection";

export default () => {
  // Must be inside PeerProvide to utilise usePeer
  const peer = usePeer();
  const [connections, onConnection] = useReducer((connections, connection) => {
    return connections
      .concat(connection);
  }, []);
  
  useEffect(() => {
    // Will append the new connection to the connections list
    peer.on("connection", onConnection);
    return () => {
      peer.removeListener("connection", onConnection);
    };
  });
  
  return (
    <Fragment>
      {
        connections
          .map((connection, index) => (
            <ConnectionProvider connection={connection} key={index}>
              <WithConnection />
            </ConnectionProvider>
          ))
      }
    </Fragment>
  );
}
```

Within a component utilising `ConnectionProvider` we can now utilise `useConnection` where
we can use the normal functions provided by [PeerJS](https://peerjs.com/docs.html)

## Contributing

Please see [Contributing](./CONTRIBUTING.md)

## Code of Conduct 

This project and everyone participating in it is governed by the [Code of Conduct listed here](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [conduct@open-network.dev](mailto:conduct@open-network.dev).

## Licence

The source code examples are licensed under the [MIT](https://choosealicense.com/licenses/mit/) license.

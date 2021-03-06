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
import React, { Fragment } from "react";
import { ConnectionProvider, usePeer, useConnections } from "@opennetwork/react-peer";
import WithConnection from "./with-connection";

export default () => {
  // Must be inside PeerProvide to utilise useConnections
  // This will return an updating list of available connections
  const connections = useConnections(); 
  
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

## API

### Peer

#### `PeerProvider`

Creates a context provider allowing a peer to be used within components or provides an existing one

**Props**:

- `peer`: Provide a peer instance to be used within the context (Optional)
- `id`: Other peers can connect to this peer using the provided ID. If no ID is given, one will be generated by the brokering server. (Optional, Not used if `peer` is provided) 
- `options`: The options (Not used if `peer` is provided) 

#### `usePeer()`

This hook retrieves the available peer from context, if no context provider (`PeerProvider`) was created then this will return null.

The returned object will have the following properties:

- `peer`: the currently available peer from context
- `status`: the status of the peer
- `id`: the identifier of the peer

#### `useConnections(peer = usePeer())`

This hook returns all available connections for a peer, if no peer argument is provided the peer from `usePeer()` is used 

#### `withPeer(Component)`

This function wraps a component and supplies the props:

- `peer`: the currently available peer from context
- `peerStatus`: the status of the peer
- `peerId`: the identifier of the peer

#### `PeerConsumer`

This consumer component is a context consumer providing the same values returned from `usePeer()`:

```js
<PeerConsumer>
  (({ peer, status, id }) => <p>{status}</p>}
</PeerConsumer>
```

#### `PeerContext`

This context can be accessed directly if needed, and allows for customisation around how the initial peer instance
is constructed, however if you're creating a provider it is recommended to create another component that makes use of
`PeerProvider`

### Connection

#### `ConnectionProvider`

Creates a new connection for the given details, or provides an existing one

**Props**:

- `connection`: Provide a connection instance to be used within the context (Optional)
- `id`: The brokering ID of the remote peer (their `peer.id`). (Not used if `connection` is provided) 
- `options`: The options (Not used if `connection` is provided) 

#### `useConnection()`

This hook retrieves the available connection from context, if no context provider (`ConnectionProvider`) was created then this will return null.

The returned object will have the following properties:

- `peer`: the currently available peer from context
- `peerStatus`: the status of the peer
- `peerId`: the identifier of the peer
- `connection`: the currently available connection from context
- `status`: the status of the connection, if the peer is in an unusable state, this will match the `peerStatus` value

#### `useData(onData, connection = useConnection())`

This hook will allow you to receive a callback whenever there is a new data event, 
if no connection argument is provided the connection from `useConnection()` is used.

#### `withConnection(Component)`

This function wraps a component and supplies the props:

- `peer`: the currently available peer from context
- `peerStatus`: the status of the peer
- `peerId`: the identifier of the peer
- `connection`: the currently available connection from context 
- `connectionStatus`: the status of the connection, if the peer is in an unusable state, this will match the `peerStatus` value

#### `ConnectionConsumer`

This consumer component is a context consumer providing the same values returned from `useConnection()`:

```js
<PeerConsumer>
  (({ peer, peerStatus, peerId, connection, status }) => <p>{status}</p>}
</PeerConsumer>
```

#### `ConnectionContext`

This context can be accessed directly if needed, and allows for customisation around how the connection instance
is constructed, however if you're creating a provider it is recommended to create another component that makes use of
`ConnectionProvider`

## Contributing

Please see [Contributing](./CONTRIBUTING.md)

## Code of Conduct 

This project and everyone participating in it is governed by the [Code of Conduct listed here](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [conduct@open-network.dev](mailto:conduct@open-network.dev).

## Licence

The source code examples are licensed under the [MIT](https://choosealicense.com/licenses/mit/) license.

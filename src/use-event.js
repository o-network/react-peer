import { useEffect } from "react";

export default (event, emitter, onEvent) => {
  // We want to be able to support multiple emitters so we aren't creating
  // useEffect dynamically, retaining the same order and count of hooks
  const emitters = (Array.isArray(emitter) ? emitter : [emitter])
    .filter(emitter => emitter);
  // Also allow an array of events to listen for
  const events = (Array.isArray(event) ? event : [event])
    .filter(event => event);
  function createBoundEventHandler(event, emitter) {
    return (...args) => onEvent(...args, event, emitter);
  }
  useEffect(() => {
    const effects = emitters
      .reduce((effects, emitter) => effects.concat(
        events
          .map(event => {
            const listener = createBoundEventHandler(event, emitter);
            emitter.on(event, listener);
            return () => emitter.removeListener(event, listener);
          })
      ), []);
    return () => effects.forEach(fn => fn());
  });
}

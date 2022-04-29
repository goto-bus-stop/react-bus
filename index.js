import React from 'react'
import mitt from 'mitt'

export const BusContext = React.createContext(/** @type {null|import('mitt').Emitter} */ (null))
const P = BusContext.Provider

/**
 * Return the event emitter.
 *
 * @return {import('mitt').Emitter}
 */
export function useBus () {
  const bus = React.useContext(BusContext)
  if (!bus) throw new Error('useBus: missing context')
  return bus
}

/**
 * Attach an event listener to the bus while this component is mounted. Adds the listener after mount, and removes it before unmount.

 * @param {import('mitt').EventType} name
 * @param {import('mitt').Handler} listener
 */
export function useListener (name, listener) {
  const bus = useBus()
  React.useEffect(() => {
    bus.on(name, listener)
    return () => {
      bus.off(name, listener)
    }
  }, [bus, name, listener])
}

/**
 * Create an event emitter that will be available to all deeply nested child elements using the useBus() hook.
 *
 * @param {{ children?: import('react').ReactNode }} props
 */
export function Provider ({ children }) {
  const [bus] = React.useState(() => mitt())
  return <P value={bus}>{children}</P>
}

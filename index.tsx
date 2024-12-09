import React from 'react'
import mitt, { type Emitter, type EventType, type Handler } from 'mitt'

type Events = Record<EventType, unknown>
const BusContext = React.createContext<Emitter<Events> | null>(null)

/** Return the event emitter. */
export function useBus () {
  const bus = React.useContext(BusContext)
  if (!bus) throw new Error('useBus: missing context')
  return bus
}

/**
 * Attach an event listener to the bus while this component is mounted.
 *
 * Adds the listener after mount, and removes it before unmount.
 */
export function useListener (name: EventType, listener: Handler) {
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
 */
export function Provider ({ children }: { children: React.ReactNode }) {
  const [bus] = React.useState(() => mitt())
  return <BusContext.Provider value={bus}>{children}</BusContext.Provider>
}

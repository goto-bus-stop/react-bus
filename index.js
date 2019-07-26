import React from 'react'
import mitt from 'mitt'

export const BusContext = React.createContext(null)

export function useBus () {
  return React.useContext(BusContext)
}

export function useListener (name, fn) {
  const bus = useBus()
  React.useEffect(() => {
    console.log('on', name)
    bus.on(name, fn)
    return () => {
      console.log('off', name)
      bus.off(name, fn)
    }
  }, [bus, name, fn])
}

export function Provider ({ children }) {
  const [bus] = React.useState(() => mitt())

  return (
    <BusContext.Provider value={bus}>
      {children}
    </BusContext.Provider>
  )
}

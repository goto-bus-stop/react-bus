import React from 'react'
import mitt from 'mitt'

export const BusContext = React.createContext(null)

export function useBus () {
  return React.useContext(BusContext)
}

export function Provider ({ children }) {
  const [bus] = React.useState(() => mitt())

  return (
    <BusContext.Provider value={bus}>
      {children}
    </BusContext.Provider>
  )
}

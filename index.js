import React from 'react'
import mitt from 'mitt'

const h = React.createElement
const Context = React.createContext()

export function withBus (name = 'bus') {
  return function decorate (BaseComponent) {
    return function WithBus (props, context) {
      return h(
        Context.Consumer,
        {},
        bus => h(BaseComponent, {
          ...props,
          [name]: bus
        })
      )
    }
  }
}

export class Provider extends React.Component {
  constructor (props) {
    super(props)
    this.state = { bus: mitt() }
  }
  render () {
    return h(
      Context.Provider,
      { value: this.state.bus },
      this.props.children
    )
  }
}

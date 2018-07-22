import React from 'react'
import mitt from 'mitt'
import { Consumer, Provider as BaseProvider } from './context'

const h = React.createElement

export function withBus (name = 'bus') {
  return function decorate (BaseComponent) {
    return function WithBus (props) {
      return h(
        Consumer,
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
      BaseProvider,
      { value: this.state.bus },
      this.props.children
    )
  }
}

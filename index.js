import React from 'react'
import PropTypes from 'prop-types'
import mitt from 'mitt'

const contextTypes = { reactBus: PropTypes.object }

export function withBus (name = 'bus') {
  return function decorate (BaseComponent) {
    function WithBus (props, context) {
      return React.createElement(BaseComponent, {
        ...props,
        [name]: context.reactBus
      })
    }
    WithBus.contextTypes = contextTypes
    return WithBus
  }
}

export class Provider extends React.Component {
  constructor (props) {
    super(props)
    this.bus = mitt()
  }
  getChildContext () {
    return { reactBus: this.bus }
  }
  render () {
    return this.props.children
  }
}
Provider.childContextTypes = contextTypes

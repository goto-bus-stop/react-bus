import React from 'react'
import { Consumer } from './context'

const h = React.createElement

function removeEvents (bus, ev) {
  Object.keys(ev).forEach(k => bus.off(k, ev[k]))
}

function addEvents (bus, ev) {
  Object.keys(ev).forEach(k => bus.on(k, ev[k]))
}

function changed (ev1, ev2) {
  const k1 = Object.keys(ev1), k2 = Object.keys(ev2)
  return k1.length !== k2.length ||
    k1.some(k => ev1[k] !== ev2[k])
}

class AddListener extends React.Component {
  constructor (props) {
    super(props)
    addEvents(props.bus, props.events)
  }
  UNSAFE_componentWillReceiveProps (nextProps) {
    const { bus, events } = this.props
    const different = changed(events, nextProps.events)
    if (nextProps.bus !== bus || different) {
      removeEvents(bus, events)
    }
    if (different) {
      addEvents(nextProps.bus, nextProps.events)
    }
  }

  componentWillUnmount () {
    removeEvents(this.props.bus, this.props.events)
  }

  render () { return null }
}
const Listener = events => h(Consumer, {},
  bus => h(AddListener, { bus, events })
)
export default Listener

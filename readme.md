# react-bus

A global event emitter for React apps.
Useful if you need some user interaction in one place trigger an action in another place on the page, such as scrolling a logging element when pressing PageUp/PageDown in an input element (without having to store scroll position in state).

## Usage

react-bus contains a `<Provider />` component and a `withBus` decorator.

`<Provider />` creates an event emitter and places it on the context.
`withBus()` takes the event emitter from context and passes it to the decorated component as the `bus` prop.

```js
import { Provider, withBus } from 'react-bus'
// Inject `bus` prop to <Component />.
const ConnectedComponent = withBus()(Component)

<Provider>
  <ConnectedComponent />
</Provider>
```

For example, to communicate "horizontally" between otherwise unrelated components:

```js
import { Provider as BusProvider, withBus } from 'react-bus'
const App = () => (
  <BusProvider>
    <ScrollBox />
    <Input />
  </BusProvider>
)
const ScrollBox = withBus()(class extends React.Component {
  onScroll = (top) => {
    this.el.scrollTop += top
  }
  componentDidMount () { this.props.bus.on('scroll', this.onScroll) }
  componentWillUnmount () { this.props.bus.off('scroll', this.onScroll) }
  render () {
    return <div ref={(el) => this.el = el}></div>
  }
})
// Scroll the ScrollBox when pageup/pagedown are pressed.
const Input = withBus()(({ bus }) => {
  return <input onKeyDown={onkeydown} />
  function onkeydown (event) {
    if (event.key === 'PageUp') bus.emit('scroll', -200)
    if (event.key === 'PageDown') bus.emit('scroll', +200)
  }
})
```

This may be easier to implement and understand than lifting the scroll state up into a global store.

There is a `Listener` component that will add and remove events when mounted and unmounted.
The ScrollBox component above could be written as:

```js
import Listener from 'react-bus/listener'

class ScrollBox extends React.Component {
  onScroll = (top) => {
    this.el.scrollTop += top
  }

  render () {
    return (
      <div ref={(el) => this.el = el}>
        <Listener scroll={this.onScroll} />
        {/* other children */}
      </div>
    )
  }
}
```

## Install

```
npm install react-bus
```

## API

### `<Provider />`

Create an event emitter that will be available to all deeply nested child elements using the `withBus()` function.

### `withBus(name='bus')(Component)`

Wrap `Component` and inject the event emitter as a prop named `name`.

### `<Listener name={handler} />

When mounted, add a listener to the global `bus` for the event named `name`. When unmounting, remove the listener. Multiple event handlers can be added at once by passing different props. You can use this component to avoid having to manually use `withBus()` and manually manage listeners on mount and unmount.

Note that prop names do _not_ include an `on` prefix.

## License

[MIT](./LICENSE)

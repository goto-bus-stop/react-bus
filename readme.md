# react-bus

A global event emitter for React apps.
Useful if you need some user interaction in one place trigger an action in another place on the page, such as scrolling a logging element when pressing PageUp/PageDown in an input element (without having to store scroll position in state).

## Usage

react-bus contains a `<Provider />` component and a `useBus` hook.

`<Provider />` creates an event emitter and places it on the context.
`useBus()` returns the event emitter from context.

```js
import { Provider, useBus } from 'react-bus'
// Use `bus` in <Component />.
function ConnectedComponent () {
  const bus = useBus()
}

<Provider>
  <ConnectedComponent />
</Provider>
```

For example, to communicate "horizontally" between otherwise unrelated components:

```js
import { Provider as BusProvider, useBus } from 'react-bus'
const App = () => (
  <BusProvider>
    <ScrollBox />
    <Input />
  </BusProvider>
)

function ScrollBox () {
  const bus = useBus()
  const el = React.useRef(null)

  React.useEffect(() => {
    function onscroll (top) {
      el.current.scrollTop += top
    }
    bus.on('scroll', onscroll)
    return () => bus.off('scroll', onscroll)
  }, [])

  return <div ref={el}></div>
}

// Scroll the ScrollBox when pageup/pagedown are pressed.
function Input () {
  const bus = useBus()
  return <input onKeyDown={onkeydown} />

  function onkeydown (event) {
    if (event.key === 'PageUp') bus.emit('scroll', -200)
    if (event.key === 'PageDown') bus.emit('scroll', +200)
  }
}
```

This may be easier to implement and understand than lifting the scroll state up into a global store.

## Install

```
npm install react-bus
```

## API

### `<Provider />`

Create an event emitter that will be available to all deeply nested child elements using the `useBus()` hook.

### `const bus = useBus()`

Return the event emitter.

## License

[MIT](./LICENSE)

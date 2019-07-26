# react-bus

[![npm](https://badgen.net/npm/v/react-bus)](https://npmjs.com/package/react-bus)
[![bundlephobia](https://badgen.net/bundlephobia/minzip/react-bus)](https://bundlephobia.com/result?p=react-bus)

A global [event emitter](https://github.com/developit/mitt) for React apps.
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
import { Provider as BusProvider, useBus, useListener } from 'react-bus'
const App = () => (
  <BusProvider>
    <ScrollBox />
    <Input />
  </BusProvider>
)

function ScrollBox () {
  const el = React.useRef(null)
  const onscroll = React.useCallback(function (top) {
    el.current.scrollTop += top
  }, [])

  useListener('scroll', onscroll)

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

### `useListener(name, fn)`

Attach an event listener to the bus while this component is mounted. Adds the listener _after_ mount, and removes it before unmount.

## License

[MIT](./LICENSE)

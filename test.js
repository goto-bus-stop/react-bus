var test = require('tape')
var React = require('react')
var TestRenderer = require('react-test-renderer')
var Provider = require('./').Provider
var useBus = require('./').useBus
var useListener = require('./').useListener

var h = React.createElement

test('emits events on context', async function (t) {
  t.plan(1)

  function onhello () {
    onhello.called = true
  }
  function Emitter (props) {
    useBus().emit('hello')
    return h('div')
  }
  function Listener (props) {
    useBus().on('hello', onhello)
    return h('div')
  }

  var renderer
  TestRenderer.act(function () {
    renderer = TestRenderer.create(
      h(Provider, {},
        h('div', {},
          h(Listener),
          h(Emitter)
        )
      )
    )
  })

  t.ok(onhello.called)
  renderer.unmount()
})

test('useListener', function (t) {
  t.plan(2)

  function onhello () {
    onhello.called = true
  }
  function Emitter (props) {
    const bus = useBus()
    React.useEffect(function () {
      bus.emit('hello')
    })
    return h('div')
  }
  function Listener (props) {
    useListener('hello', onhello)
    return h('div')
  }

  var renderer
  TestRenderer.act(function () {
    renderer = TestRenderer.create(
      h(Provider, {},
        h('div', {},
          h(Listener),
          h(Emitter)
        )
      )
    )
  })

  t.ok(onhello.called)
  onhello.called = false
  TestRenderer.act(function () {
    renderer.update(
      h(Provider, {},
        h('div', {},
          h(Emitter)
        )
      )
    )
  })
  t.notOk(onhello.called)

  renderer.unmount()
})

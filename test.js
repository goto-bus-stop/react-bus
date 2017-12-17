var test = require('tape')
var React = require('react')
var TestRenderer = require('react-test-renderer')
var Provider = require('.').Provider
var withBus = require('.').withBus

var h = React.createElement

test('emits events on context', function (t) {
  t.plan(1)

  function onhello () {
    onhello.called = true
  }
  var Emitter = withBus()(function (props) {
    props.bus.emit('hello')
    return h('div')
  })
  var Listener = withBus()(function (props) {
    props.bus.on('hello', onhello)
    return h('div')
  })

  var renderer = TestRenderer.create(
    h(Provider, {},
      h('div', {},
        h(Listener),
        h(Emitter)
      )
    )
  )

  t.ok(onhello.called)
  renderer.unmount()
})

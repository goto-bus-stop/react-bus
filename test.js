var test = require('tape')
var React = require('react')
var TestRenderer = require('react-test-renderer')
var Provider = require('./').Provider
var useBus = require('./').useBus

var h = React.createElement

test('emits events on context', function (t) {
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

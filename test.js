var test = require('tape')
var React = require('react')
var TestRenderer = require('react-test-renderer')
var Provider = require('./').Provider
var withBus = require('./').withBus
var AddListener = require('./listener')

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

test('can add listeners declaratively', function (t) {
  t.plan(2)

  function onhello () { onhello.called++ }
  onhello.called = 0

  var bus
  var Emitter = withBus()(function (props) {
    (bus = props.bus).emit('hello')
    return h('div')
  })

  var renderer = TestRenderer.create(
    h(Provider, {},
      h('div', {},
        h(AddListener, { hello: onhello }),
        h(Emitter)
      )
    )
  )

  t.equal(onhello.called, 1)
  renderer.unmount()

  bus.emit('hello')
  t.equal(onhello.called, 1)
})

test('replaces declarative listeners', function (t) {
  t.plan(4)

  function onhello () { onhello.called++ }
  function onbye () { onbye.called++ }
  onhello.called = onbye.called = 0

  var Emitter = withBus()(function (props) {
    props.bus.emit('hello')
    return h('div')
  })

  var renderer = TestRenderer.create(
    h(Provider, {},
      h('div', {},
        h(AddListener, { hello: onhello }),
        h(Emitter)
      )
    )
  )

  t.equal(onhello.called, 1)
  t.equal(onbye.called, 0)

  renderer.update(
    h(Provider, {},
      h('div', {},
        h(AddListener, { hello: onbye }),
        h(Emitter)
      )
    )
  )

  t.equal(onhello.called, 1)
  t.equal(onbye.called, 1)

  renderer.unmount()
})

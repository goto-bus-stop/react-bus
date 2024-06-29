'use strict'
var test = require('node:test')
var assert = require('node:assert')
var React = require('react')
var ReactDOM = require('react-dom')
var env = require('min-react-env')
var Provider = require('./').Provider
var useBus = require('./').useBus
var useListener = require('./').useListener

Object.assign(global, env)

var act = React.act || require('react-dom/test-utils').act

function createTestRenderer () {
  var div = env.document.createElement('div')
  var root
  var reactMajor = parseInt((ReactDOM.version || '16').split('.')[0], 10)
  if (reactMajor >= 18) {
    var createRoot = require('react-dom/client').createRoot
    root = createRoot(div)
  } else {
    root = {
      render: function (element) {
        ReactDOM.render(element, div)
      },
      unmount: function () {
        ReactDOM.unmountComponentAtNode(div)
      },
    }
  }

  return root
}

var h = React.createElement

test('emits events on context', function () {
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

  var renderer = createTestRenderer()
  act(function () {
    renderer.render(
      h(Provider, {},
        h('div', {},
          h(Listener),
          h(Emitter)
        )
      )
    )
  })

  assert(onhello.called)
  renderer.unmount()
})

test('useListener', function () {
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

  var renderer = createTestRenderer()
  act(function () {
    renderer.render(
      h(Provider, {},
        h('div', {},
          h(Listener),
          h(Emitter)
        )
      )
    )
  })

  assert(onhello.called)
  onhello.called = false
  act(function () {
    renderer.render(
      h(Provider, {},
        h('div', {},
          h(Emitter)
        )
      )
    )
  })
  assert(!onhello.called)

  renderer.unmount()
})

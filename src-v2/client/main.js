import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { createApp, element } from 'deku'
import reducer from './reducer/'
import App from './Layout.jsx'
import actions from './actions'

// Wait for Meteor to be ready, then initialyse the data and the UI
Meteor.startup(() => {
  console.log('Meteor.startup')
  const rootElement = document.getElementById('root')
  
  // create a Redux store to handle all UI actions and side-effects
  const logger = createLogger({ timestamp: false, logErrors: false })
  const store = applyMiddleware(thunk, logger)(createStore)(reducer)
  const dispatch = store.dispatch

  // we use a global variable, for debuging purpose only
  // it is useful to dispatch some actions from the browser console
  Crystal = { dispatch }
  
  // create a Deku renderer that can turn vnodes into real DOM elements
  // then, update the page when the state of the redux store has changed
  const render = createApp(rootElement)
  function renderApp () {
    let end, begin = new Date()
    render(element(Layout, { state: store.getState() }))
    end = new Date()
    //console.debug('Deku render done in ' + (end - begin) + 'ms')
  }
  store.subscribe(renderApp)

  // init the action module, so it can intercept events and dispatch actions
  actions(dispatch, rootElement)
  console.log('Meteor.startup done')
})

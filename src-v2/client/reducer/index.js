import { combineReducers } from 'redux'
import route from './route'
import staticData from './staticData'
import auth from './auth'
import cardBrowser from './cardBrowser'
import counter from './counter'

export default combineReducers({
  route,
  staticData,
  auth,
  cardBrowser,
  counter
})

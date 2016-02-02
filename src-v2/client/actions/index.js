import counter from './counter'
import staticData from './staticData'
import cardBrowser from './cardBrowser'
import auth from './auth'
import router from './router'

function init (dispatch, rootElement) {
  staticData.load(dispatch)
  
  counter(dispatch, rootElement)
  cardBrowser(dispatch, rootElement)
  auth(dispatch, rootElement)

  router.init(dispatch)
  router.start()
}

export default init

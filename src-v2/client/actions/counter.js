import gator from 'gator'
import { dataAttr } from './utils'

function initCounterActions (dispatch, rootElement) {
  const groot = gator(rootElement)

  groot.on('click', 'button.increment', e => {
    console.debug('gator click button.increment', e)
    dispatch({
      type: 'counter.increment',
      counterId: dataAttr(e, 'id')
    })
  })

  groot.on('click', 'button.decrement', e => {
    dispatch({
      type: 'counter.decrement',
      counterId: dataAttr(e, 'id')
    })
  })

  groot.on('click', 'button.reset', e => {
    dispatch({
      type: 'counter.reset',
      counterId: dataAttr(e, 'id')
    })
  })
}

export default initCounterActions

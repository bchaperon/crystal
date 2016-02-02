import gator from 'gator'
import { dataAttr } from './utils'

function init (dispatch, rootElement) {
  const groot = gator(rootElement)

  groot.on('change', '.filter-container input[type="checkbox"]', event => {
    const target = event.target
    dispatch({
      type: 'cardBrowser.toggleFilter',
      filterId: dataAttr(event, 'filter-id'),
      optionId: dataAttr(event, 'option-id'),
      checked: target.checked
    })
  })

  groot.on('change', 'select[data-action="displayAs"]', event => {
    dispatch({
      type: 'cardBrowser.displayAs',
      displayAs: event.target.value
    })
  })


}



export default init

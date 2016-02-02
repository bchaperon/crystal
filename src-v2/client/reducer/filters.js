import R from 'ramda'

// a single filter is a list of options to select from
// we can select multiple options
// an option is an object: { id, name, checked }
function filter (state, action) {
  if (action.type !== 'cardBrowser.toggleFilter') {
    return state
  }
  return state.map(option => {
    return option.id == action.optionId
      ? R.assoc('checked', action.checked, option)
      : option
  })
}

const filters = initialState => (state, action) => {
  if (state === undefined) {
    return initialState
  }
  if (action.type !== 'cardBrowser.toggleFilter') {
    return state
  }
  
  const filterState = state[action.filterId]
  if (!filterState) {
    return state
  }
  const newFilterState = filter(filterState, action)
  if (newFilterState === filterState) {
    return state
  }
  else {
    let result = { ...state }
    result[action.filterId] = newFilterState
    return result
  }
}

export default filters

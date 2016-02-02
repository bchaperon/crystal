const defaultState = {
  loading: false,
  ready: false
}

export default function (state = defaultState, action) {
  switch (action.type) {
  case 'staticData.loading':
    return { loading: true, ready: false }
  case 'staticData.ready':
    return { loading: false, ready: true }
  default:
    return state
  }
}

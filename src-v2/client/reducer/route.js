export default function (state = {}, action) {
  switch (action.type) {
  case 'route':
    return { page: action.page, props: action.props }
  default:
    return state
  }
}

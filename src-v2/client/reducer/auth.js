import R from 'ramda'

const initialState = {
  // the value returned by Meteor.user()
  user: null,
  loggingIn: false,
  loginError: null
}

function authReducer (state = initialState, action) {
  switch (action.type) {
  case 'auth.user':
    return { ...state, user: action.user, loggingIn: action.loggingIn }
  case 'auth.loginError':
    return { ...state, loginError: action.error }
  case 'auth.loginSuccess':
    return { ...state, loginError: null }
  default:
    return state
  }
}

export default authReducer

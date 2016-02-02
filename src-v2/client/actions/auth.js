import gator from 'gator'


function initAuthActions (dispatch, rootElement) {
  const groot = gator(rootElement)
  
  // track the current user
  Tracker.autorun(c => {
    const user = Meteor.user()
    const loggingIn = Meteor.loggingIn()
    dispatch({ type: 'auth.user', user, loggingIn })
  })
  
  // submit the login form
  groot.on('submit', '.login-form', e => {
    e.preventDefault()
    e.stopPropagation()
    const form = e.target
    const username = form.elements['username'].value.trim()
    const password = form.elements['password'].value

    Meteor.loginWithPassword(username, password, error => {
      if (error) {
        dispatch({ type: 'auth.loginError', error })
      }
      else {
        dispatch({ type: 'auth.loginSuccess' })
      }
    })
  })
  
  // submit the register form
  groot.on('submit', '.register-form', e => {
    e.preventDefault()
    e.stopPropagation()
    const form = e.target
    const username = form.elements['username'].value.trim()
    const password = form.elements['password'].value
    const password2 = form.elements['password2'].value

    if (password !== password2) {
      dispatch({ type: 'auth.registerError', error: {
        message: "The 2 passwords don't match."
      }})
      return
    }
    
    Accounts.createUser({ username, password }, error => {
      if (error) {
        dispatch({ type: 'auth.registerError', error })
      }
      else {
        dispatch({ type: 'auth.registerSuccess' })
      }
    })
  })
  
}

export default initAuthActions

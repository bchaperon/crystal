/** @jsx element */
import { element } from 'deku'
import { Login, Register } from '../ui/auth'

function TestPage ({ props }) {
  const auth = props.state.auth
  const { user, loggingIn, loginError } = auth
  
  return (
  <div>
    <p>Current user: { user ? user.username : 'no user'}</p>
    <p>{ loggingIn ? 'Logging in, please wait...' : '' }</p>
    <p>{ loginError ? loginError.message : 'no error' }</p>
    <Login />
    <br/>
    <Register />
  </div> )
}

export default TestPage

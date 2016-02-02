/** @jsx element */
import { element } from 'deku'

function Login ({ props }) {
  return (
  <form class='login-form'>
    <label for='username'>Username</label>
    <input type='text' name='username' required />

    <label for='password'>Password</label>
    <input type='password' name='password' required />

    <button type='submit'>Sign In</button>
  </form> )
}

export default Login

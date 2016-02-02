/** @jsx element */
import { element } from 'deku'

function Register ({ props }) {
  return (
  <form class='register-form'>
    <label for='username'>Username</label>
    <input type='text' name='username' required />

    <label for='password'>Password</label>
    <input type='password' name='password' required />

    <label for='password2'>Confirm Password</label>
    <input type='password' name='password2' required />

    <button type='submit'>Register</button>
  </form> )
}

export default Register

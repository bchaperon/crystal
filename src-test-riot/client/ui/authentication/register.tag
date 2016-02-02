<register>
  <form onsubmit={ submit }>
    <label>
      Username
      <input name='user' placeholder='User name or email' />
    </label>
    <label>
      Password
      <input type='password' name='password' />
    </label>
    <label>
      Confirm password
      <input type='password2' name='password2' />
    </label>
    <button type='submit'>Create Account</button>
  </form>

  <script>
    submit() {
      var user = this.user.value.trim()
      var pwd = this.password.value
      var pwd2 = this.password2.value
      console.debug('Register', user, pwd, pwd2)
      var options = {
        username: user,
        password: pwd
      }
      Accounts.createUser(options, function (error) {
        console.debug('Register done', error)
      })
    }
  </script>
</register>
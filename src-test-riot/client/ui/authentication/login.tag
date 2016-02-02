<login>
  <form onsubmit={ submit }>
    <label>
      Username
      <input name='user' placeholder='User name or email' />
    </label>
    <label>
      Password
      <input type='password' name='password' />
    </label>
    <button type='submit'>Sign In</button>
  </form>

  <script>
    submit() {
      var user = this.user.value.trim()
      var pwd = this.password.value
      console.debug('Sign in', user, pwd)
      Meteor.loginWithPassword(user, pwd, function (error) {
        console.debug('sign in done', error)
      })
    }
  </script>
</login>
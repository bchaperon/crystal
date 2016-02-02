var EnumMode = new Crystal.Enum(['signIn', 'createAccount', 'user']);

// React class to browse a set of cards 
Crystal.React.Login = React.createClass({
  mixins: [Crystal.React.FormMixin],

  // no props
  
  getInitialState: function () {
    return {
      creatingAccount: false,
      error: null
    }
  },
  
  // ------------------------
  
  switchToCreateAccount: function () {
    this.setState({
      creatingAccount: true,
      error: null
    });
  },
  
  switchToSignIn: function () {
    this.setState({
      creatingAccount: false,
      error: null
    });
  },
  
  mode: function () {
    var result;
    
    if (Meteor.user()) {
      result = EnumMode.user;
    }
    else {
      if (this.state.creatingAccount)
        result = EnumMode.createAccount;
      else
        result = EnumMode.signIn;
    }
    return result;
  },
  
  onSubmit: function (event) {
    var mode = this.mode();
    
    event.preventDefault();
    
    if (mode === EnumMode.user) {
      this.changePassword();
    }
    else if (mode === EnumMode.createAccount) {
      this.createAccount();
    }
    else {
      this.signIn();      
    }
  },
  
  signIn: function () {
    var self = this;
    var username = self.getStringValue('username');
    var password = self.getStringValueNoTrim('password');
    
    Meteor.loginWithPassword(username, password, function (error) {
      self.setState({ error: error });
    });
  },
  
  signOut: function () {
    this.setState({ error: null });
    Meteor.logout();
  },

  createAccount: function () {
    var self = this;
    var username = self.getStringValue('username');
    var password = self.getStringValueNoTrim('password');
    var password2 = self.getStringValueNoTrim('password2');
    
    if (password !== password2) {
      self.setState({ error: 'You must enter the same password twice' });
      return;
    }
    
    Accounts.createUser(
      { username: username, password: password }, 
      function (error) {
        self.setState({ error: error });
    });
  },
  
  changePassword: function () {
    var self = this;
    var currentPassword = self.getStringValueNoTrim('currentPassword');
    var password = self.getStringValueNoTrim('password');
    var password2 = self.getStringValueNoTrim('password2');
    
    if (password !== password2) {
      self.setState({ error: 'You must enter the same password twice' });
      return;
    }
    
    Accounts.changePassword(currentPassword, password, function (error) {
        self.setState({ error: error.reason });
    });
  },
  
  // ------------------------
  
  render: function () {
    var mode = this.mode();
    var html = [];

    // links to sign out or swith mode
    if (mode === EnumMode.user) {
      html.push( <a href='' onClick={this.signOut}>Sign Out ({Meteor.user().username})</a> );
      html.push(
        <label>Current Password <input ref='currentPassword' type='password' required /></label>
      );
      html.push(
        <label>New Password <input ref='password' type='password' required /></label>
      );
      html.push(
        <label>New Password Again <input ref='password2' type='password' required /></label>
      );
      html.push(
        <input type='submit' className='pure-button pure-button-primary'
          value='Change Password' />
      );
    }
    else if (mode === EnumMode.createAccount) {
      html.push( <a href='' onClick={this.switchToSignIn}>Sign In</a> );
    }
    else {
      html.push( <a href='' onClick={this.switchToCreateAccount}>Create Account</a> );
    }
        
    if (mode !== EnumMode.user) {
      html.push(
        <label>Username <input ref='username' type='text' required /></label>
      );
      html.push(
        <label>Password <input ref='password' type='password' required /></label>
      );
    }
    
    if (mode === EnumMode.signIn) {
      html.push(
        <input type='submit' className='pure-button pure-button-primary'
          value='Sign In' />
      );
    }
    
    if (mode === EnumMode.createAccount) {
      html.push(
        <label>Password Again <input ref='password2' type='password' required /></label>
      );
      html.push(
        <input type='submit' className='pure-button pure-button-primary'
          value='Create Account' />
      );
    }
    
    if (this.state.error) {
      html.push(<span className='error'>{this.state.error.reason}</span>);
    }
    
    return (
      <form className='login-dialog pure-form pure-form-aligned' onSubmit={this.onSubmit}>
        {html}
      </form>
    );
  }
});

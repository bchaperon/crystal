Meteor.startup(function () {
  var adminUser = Meteor.users.findOne({username: 'admin'});
  var testUser = Meteor.users.findOne({username: 'test'});
  var id;
	
	// insert the admin user
	if (! adminUser) {
		console.log('No admin user found, creating a new one...');
		id = Accounts.createUser({ username: 'admin', password: 'meteorshower' });
		adminUser = Meteor.users.findOne(id);
	}

	// update the admin user to be sure it is admin
	if (adminUser && ! adminUser.isAdmin) {
		console.log('The admin user is not really an admin, updating...');
		Meteor.users.update(adminUser._id, { $set: { isAdmin: true } });
	}	
  
  // insert the test user
	if (testUser) {
	  Accounts.setPassword(testUser._id, 'test');
	}
  else {
		console.log('No test user found, creating a new one...');
		Accounts.createUser({ username: 'test', password: 'test' });
	}
});


if (typeof Crystal === 'undefined') {
  Crystal = {
    classes: {},
    enums: {},
    views: {},
    models: {}
  }
} 
else {
  console.error('namespace.js : the global var Crystal already exits', Crystal)
}

if (Meteor.isClient) {
  Dispatcher = riot.observable()
}

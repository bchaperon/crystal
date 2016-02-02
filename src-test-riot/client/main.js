'use strict'

Meteor.startup(function () {
  console.debug('Meteor.startup')

  riot.mount('*')

  // start the router
  Crystal.startRouter()
  
  console.debug('Meteor.startup done')
})

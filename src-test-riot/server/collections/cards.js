
Cards = new Meteor.Collection('cards')

Cards.deny({
  insert: function () { return true },
  update: function () { return true },
  remove: function () { return true }
})

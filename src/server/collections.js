// the collections on the server

// the cards
// clients can't modify this collection
Cards = new Meteor.Collection('cards');
Cards.deny({
  insert: function() { return true; },
  update: function() { return true; },
  remove: function() { return true; }
});

// the user decks
Decks = new Meteor.Collection('decks');

// clients should only update or delete their own decks
// they can't change the owner of a deck
// insert is done with a server method (see createDeck)
var deckFields = [ 'hero', 'cards', 'name', 'description', 'note', 'lastUpdate' ];
Decks.allow({
  insert: function(userId, deck) { 
    return false;
  },
  update: function(userId, deck, fields, modifier) {
    return userId
      && userId === deck.user 
      && _.every(fields, function (item) {
        return deckFields.indexOf(item) !== -1;
      });
  },
  remove: function(userId, deck) {
    return userId && userId === deck.user;
  },
  fetch: [ 'user' ]
});


Meteor.methods({
	// create a new deck, server side
	createDeck: function(deckName) {
    var userId = Meteor.userId();

    check(deckName, String);

    if (! userId) {
      throw new Meteor.Error(403, 'You must login to create a deck');
    }

    return Decks.insert({
      user: userId,
      hero: null,
      cards: {},
      name: deckName || 'Unnamed Deck',
      decription: null,
      note: null,
      creationDate: new Date(),
      lastUpdate: null
    });
  }
});

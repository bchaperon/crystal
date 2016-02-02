
// init of the client application
Meteor.startup(function () {
  // to know if we are an admin user
  Meteor.subscribe('userData');
  
  // get the user decks
  Meteor.subscribe('userDecks')
  Decks = new Meteor.Collection('decks');

  // a local collection to store a deck
  // used only if we have no user
  FakeDecks = new Meteor.Collection(null);
  FakeDecks.insert({ _id: 'fake' });

  // store the cards in a local collection
  Cards = new Meteor.Collection(null, { 
    transform: function (card) {
      card.image = function (foil) {
        if (this.imageUrl) {
          return this.imageUrl
        }        
        // no foil yet for Lost Lands
        if (foil && this.rank < 4000) {
          return 'http://www.shadowera.com/cards/' + this._id + 'f.jpg'
        }
        else {
          return 'http://www.shadowera.com/cards/' + this._id + '.jpg'
        }
      }
      
      return card
    }
  })
  
  Crystal.cardList.forEach(function (card) {
    Cards.insert(card);
  });

  // let's free some memory
  Crystal.cardList = null;
});

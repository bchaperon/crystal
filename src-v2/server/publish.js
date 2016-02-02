import { cards, decks } from '/lib/collections'

export default function () {
  Meteor.publish('allCards', function () {
    return cards.find()
  })
}

/*
Meteor.publish('userDecks', function() {
  return Decks.find({ user: this.userId });
});

Meteor.publish('singleDeck', function(deckId) {
  check(deckId, String);
  return Decks.find({ _id: deckId }, { fields: { note: 0 } });
});

Meteor.publish('userData', function () {
  return Meteor.users.find({ _id: this.userId }, { fields: { isAdmin: 1 } });
});
*/

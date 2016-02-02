import { Mongo } from 'meteor/mongo'

export const cards = new Mongo.Collection('cards')
export const decks = new Mongo.Collection('decks')

if (Meteor.isServer) {
  const all = {
    insert: () => (true),
    update: () => (true),
    remove: () => (true)
  }
  cards.deny(all)
  decks.deny(all)
}

// CardSet is a local collection, both on the client and the server
// it is more convenient, because then it is always available
// we never have to wait for its subcribtion to be ready
export const cardSets = new Mongo.Collection(null)

cardSets.insert({
	_id: 'crystals',
	rank: 1,
	name: 'Call of the Crystals',
	prefix: 'se',
	count: 200,
	actualCount: 201
})

cardSets.insert({
	_id: 'prophecies',
	rank: 2,
	name: 'Dark Prophecies',
	prefix: 'ex',
	count: 150,
	actualCount: 155
})

cardSets.insert({
	_id: 'fates',
	rank: 3,
	name: 'Shattered Fates',
	prefix: 'sf',
	count: 200,
	actualCount: 202
})

cardSets.insert({
	_id: 'lands',
	rank: 4,
	name: 'Lost Lands',
	prefix: 'll',
	count: 200,
	actualCount: 200
})

//export default {
//  cards, cardSets, decks
  //}

// CardSet is a local collection, both on the client and the server
// it is more convenient, because then it is always available
// we never have to wait for its subcribtion to be ready
CardSets = new Meteor.Collection(null)

CardSets.insert({
	_id: 'crystals',
	rank: 1,
	name: 'Call of the Crystals',
	prefix: 'se',
	numberOfCards: 200,
	actualNumberOfCards: 201,
  beta: false
})

CardSets.insert({
	_id: 'prophecies',
	rank: 2,
	name: 'Dark Prophecies',
	prefix: 'ex',
	numberOfCards: 150,
	actualNumberOfCards: 155,
  beta: false
})

CardSets.insert({
	_id: 'fates',
	rank: 3,
	name: 'Shattered Fates',
	prefix: 'sf',
	numberOfCards: 200,
	actualNumberOfCards: 202,
  beta: false
})

CardSets.insert({
	_id: 'lands',
	rank: 4,
	name: 'Lost Lands',
	prefix: 'll',
	numberOfCards: 200,
	actualNumberOfCards: 200,
  beta: true
})

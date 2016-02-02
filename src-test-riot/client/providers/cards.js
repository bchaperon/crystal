'use strict'

var sortOptions = [
  { id: 'ref', name: 'reference', sort: { rank: 1 } },
  { id: 'name', name: 'name', sort: { name: 1, rank: 1 } },
  { id: 'type', name: 'type', sort: { type: 1, subType: 1, rank: 1 } },
  { id: 'faction', name: 'faction', sort: { faction: 1, classes: 1, rank: 1 } },
  { id: 'cost', name: 'casting cost 0..7', sort: { castingCost: 1, rank: 1 } },
  { id: 'costDesc', name: 'casting cost 7..0', sort: { castingCost: -1, rank: -1 } },
  { id: 'rarity', name: 'rarity', sort: { rarity: 1, rank: 1 } }
]


var subCards = Meteor.subscribe('allCards')


function ready() {
  return subCards.ready()
}

function byId(id) {
  check(id, String)
  return Cards.findOne({ _id: id})
}

function find(filter, sortId, limit) {
  check(filter, Object)
  check(sortId, String)
  check(limit, Match.Integer)

  //console.log('card filter', filter)

  var sortOption = _.find(sortOptions, function(obj) { return obj.id === sortId })
  var sort = sortOption ? sortOption.sort : { rank: 1 }
  return Cards.find(filter, { sort, limit }).fetch()
}

Crystal.cards = {
  ready, byId, find, sortOptions
}

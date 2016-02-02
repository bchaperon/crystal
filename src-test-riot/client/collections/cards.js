'use strict'

function url() {
  return '/cards/' + this._id
}

function imageUrl() {
  return 'http://www.shadowera.com/cards/' + this._id + '.jpg'
}

function typeName() {
  return Crystal.enums.cardTypes.nameForId(this.type)
}

function factionAndClassName() {
  var factionName = Crystal.enums.cardFactions.nameForId(this.faction)
  //var className = Crystal.enums.cardFactions.nameForId(this.classes)
  return factionName
}

window.Cards = new Meteor.Collection('cards', {
  transform: function (card) {
    card.url = url
    card.imageUrl = imageUrl
    card.typeName = typeName
    card.factionAndClassName = factionAndClassName
    return card
  }
})

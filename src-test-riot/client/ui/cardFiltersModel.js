'use strict'

class CardFiltersModel {
  constructor() {
    this._filters = new Meteor.Collection(null)
  }

  init() {
    this.addFilter('faction', 'Factions', Crystal.enums.cardFactions)
    this.addFilter('classes', 'Classes', Crystal.enums.cardClasses)
    this.addFilter('type', 'Types', Crystal.enums.cardTypes)
    this.addFilter('rarity', 'Rarities', Crystal.enums.cardRarities)
    
    //Crystal.cards.cardSets.find().
  }

  filters() {
    return this._filters.find().fetch()
  }

  addFilter(mongoField, name, enumeration) {
    this._filters.insert({
      _id: mongoField,
      name: name,
      options: enumeration.map(function (id, name) {
        return {
          _id: id,
          name: name,
          checked: true
        }
      })
    })
  }

//  addTypeFilter() {
//    this.addFilter('type', 'Types', Crystal.enums.cardTypes)
//  }

  updateFilter(filterName, optionId, checked) {
    this._filters.update(
      { name: filterName, 'options._id': optionId },
      { $set: { 'options.$.checked': checked } }
    )
  }

  mongoSelector() {
    var options, values, sel = {}
    this._filters.find().forEach(function (f) {
      options = _.where(f.options, { checked: true })
      values = _.pluck(options, '_id')
      sel[f._id] = { $in: values }
    })
    return sel
  }
}

Crystal.CardFiltersModel = CardFiltersModel

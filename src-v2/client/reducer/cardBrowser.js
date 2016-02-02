import { combineReducers } from 'redux'
import { cardSets } from '/lib/collections'
import { cardFactions, cardClasses, cardTypes, cardRarities } from '/lib/enums'
import filters from './filters'
import R from 'ramda'

function fromEnum (e) {
  return e.map((id, name) => {
    return { id, name, checked: true }
  })
}

const filtersInitialState = {
  faction: fromEnum(cardFactions),
  classes: fromEnum(cardClasses),
  type: fromEnum(cardTypes),
  rarity: fromEnum(cardRarities),
  cardSet: cardSets.find().map(doc => {
    return { id: doc._id, name: doc.name, checked: true }
  })
}

function tags (state = [], action) {
  switch (action.type) {
  case 'cardBrowser.addTag':
    return R.contains(action.tag, state)
      ? state
      : R.append(action.tag, state)
  case 'cardBrowser.removeTag':
    return R.without([ action.tag ], state)
  default:
    return state
  }
}

function displayAs (state = 'table', action) {
  return action.type === 'cardBrowser.displayAs'
    ? action.displayAs
    : state
}

function orderBy (state = 'ref', action) {
  return action.type === 'cardBrowser.orderBy'
    ? action.orderBy
    : state
}

const cardBrowserReducer = combineReducers({
  filters: filters(filtersInitialState),
  tags,
  displayAs,
  orderBy
})

export default cardBrowserReducer

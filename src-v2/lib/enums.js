'use strict'

function makeEnum (values) {
  let obj, id, name

  // the argument is an array or an object ?
  if (values instanceof Array) {
    obj = {}
    for (id = 0; id < values.length; ++id) {
      name = values[id]
      obj[name] = id
    }
  }
  else {
    obj = { ...values }
  }
  
  // function callback(id, name)
  obj.forEach = function (callback) {
    let id, name
    for (name in obj) {
  	  if (obj.hasOwnProperty(name)) {
  			id = obj[name]
        if (typeof id === 'number' || typeof id === 'string') {
          callback(id, name)
        }
  		}
  	}
  }

  // function callback(id, name)
  obj.map = function (callback) {
    let result = []
    obj.forEach(function (id, name) {
      result.push(callback(id, name))
    })
    return result
  }
  
  return obj
}


// card types
export const cardTypes = makeEnum({
	hero: 0,
	ally: 1,
	ability: 2,
	item: 3,
  location: 4
})

// factions
export const cardFactions = makeEnum({
	human: 0,
	shadow: 1,
	neutral: 2
})

// classes
export const cardClasses = makeEnum({
  warrior: 0,
  hunter: 1,
  mage: 2,
  priest: 3,
  rogue: 4,
  wulven: 5,
  elemental: 6,
  neutral: 9
})

// ally types
export const allyTypes = makeEnum({
	none: 0,
  aldmor: 10,
  homunculus: 80,
  ravager: 180,
  templar: 200,
  twilight: 207,
  undead: 210,
  wulven: 230,
  yari: 250
})

export const abilityTypes = makeEnum({
	none: 0,
	support: 1,
	attachment: 2
})

export const itemTypes = makeEnum({
	artifact: 0,
	trap: 1,
	armor: 2,
	weapon: 3
})

export const locationTypes = makeEnum([
  'balor', 'ogmaga', 'thriss', 'tinnal', 'scheuth'
])

// rarity
export const cardRarities = makeEnum([
  'hero', 'common', 'uncommon', 'rare', 'epic', 'legendary'
])

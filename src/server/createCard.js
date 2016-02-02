
function pickCardValues (values) {
  var card;
  var allySubTypeName;
  
	// pick out the white listed keys
	card = _.pick(values, 'cardSet', 'rankInCardSet',
    'imageUrl',
    'name',
    'type', 'subType', 'faction', 'classes', 
    'castingCost', 'attack', 'defense', 'durability',
    'unique', 'restricted', 'rarity',
    'description', 'opposingDescription', 'tags');
  
  if (card.classes.length === 0) {
    card.classes[0] = EnumClasses.neutral;
  }
  card.description = card.description || '';
  card.tags = card.tags || [];
    
  // trim, check var types...
  
	// hero
	if (card.type === EnumCardTypes.hero) {
    card.subType = null;
    card.castingCost = null;
    
    // only one class, and no neutral hero
		if (card.classes.length !== 1) {
			throw new Meteor.Error(403, 'A hero must have exactly one class');				
		}
    if (card.classes[0] === EnumClasses.neutral) {
			throw new Meteor.Error(403, 'The class of a hero cannot be neutral');        
    }
    
    // set health according to the class
    switch (card.classes[0]) {
    case EnumClasses.warrior:
      card.defense = 30;
      break;
    case EnumClasses.hunter:
    case EnumClasses.wulven:
    case EnumClasses.elemental:
      card.defense = 28;
      break;
    case EnumClasses.rogue:
      card.defense = 27;
      break;
    case EnumClasses.mage:
    case EnumClasses.priest:
      card.defense = 26;
      break;
    }
	}
  
  // ally : add the subtype in the tags (yari, undead, templar...)
	if (card.type === EnumCardTypes.ally && card.subType !== EnumAllyTypes.none) {
    allySubTypeName = EnumAllyTypes.nameForId(card.subType);
    if (card.tags.indexOf(allySubTypeName) === -1) {
      card.tags.push(allySubTypeName);
    }
	}
  
  return card;
}


Meteor.methods({
	// create a new card, server side
	createCard: function (values) {
		var card, existingCard;
    var cardSet;
    
    check(values, Object);
		
		if ( ! Crystal.isAdmin()) {
			throw new Meteor.Error(403, 'Only an admin user can do that');
		}

		// pick out the white listed keys
    card = pickCardValues(values);
    		
		// check duplicates references
		existingCard = Cards.findOne({ cardSet: card.cardSet, rankInCardSet: card.rankInCardSet });
		
		if (existingCard) {
			throw new Meteor.Error(403, 
        'A card with the same set and rank already exists (_id: ' + existingCard._id + ')');
		}

    // find the card set
    cardSet = CardSets.findOne(card.cardSet);
    if (! cardSet) {
      throw new Meteor.Error(403, "This card set doesn't exist : " + card.cardSet);
    }

		// set the _id : we use the card reference (se001, ex042...)
		card._id = Crystal.cardRef(card.cardSet, card.rankInCardSet);
    
    // set the rank (useful to sort the cards)
    card.rank = (cardSet.rank * 1000) + card.rankInCardSet;

		// insert the card, and return the _id of this new card
		return Cards.insert(card);
	},
  
  updateCard: function (cardId, values) {
		var card;
		
    check(cardId, String);
    check(values, Object);
    
		if ( ! Crystal.isAdmin()) {
			throw new Meteor.Error(403, 'Only an admin user can do that');
		}

		// pick out the white listed keys
    card = pickCardValues(values);
    delete card.cardSet;
    delete card.rankInCardSet;

		// update the card
		return Cards.update({ _id: cardId }, { $set: card });
  }
});

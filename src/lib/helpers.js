
Crystal.isAdmin = function () {
  return Meteor.user() && Meteor.user().isAdmin;
};

// make a card reference (ie se001, ex150, sf042, etc...)
// cardSetId : string, the _id of the card set
// rank : number
Crystal.cardRef = function (cardSetId, rank) {
	var cardSet = CardSets.findOne(cardSetId);
	rank = rank || 0;
		
	if (! cardSet) {
		console.error('Error in Crystal.cardRef, unknown card set id', cardSetId, rank);
		return null;
	}
	
	// on format le rank sur 3 characteres
	rank = rank.toString();
	while (rank.length < 3) {
	  rank = '0'.concat(rank);				
	}

	return cardSet.prefix + rank;		
};

Crystal.imagePath = function (cardRef, alt) {
  if (arguments.length === 2) {
    cardRef = Crystal.cardRef(arguments[0], arguments[1]);
  }
  return 'http://www.shadowera.com/cards/' + cardRef + '.jpg';
};
// http://www.shadowera.com/cards/se040b.jpg
// http://www.shadowera.com/cards/ex220.jpg

Crystal.attackDefInfos = function (card) {
  if (card.type === EnumCardTypes.hero) {
    return {
      att: null,
      def: card.defense,
      label: 'Defense',
      value: card.defense.toString()
    }
  }
  
  if (card.type === EnumCardTypes.ally) {
    return {
      att: card.attack,
      def: card.defense,
      label: 'Attack / Defense',
      value: card.attack + ' / ' + card.defense
    };
  }
  
  if (card.type === EnumCardTypes.item) {
    if (card.subType === EnumItemTypes.artifact && card.durability) {
      return {
        att: null,
        def: card.durability,
        label: 'Durability',
        value: card.durability.toString() + 'D'
      };
    }
    else if (card.subType === EnumItemTypes.armor) {
      return {
        att: card.durability,
        def: card.defense,
        label: 'Durability / Defense',
        value: card.durability + ' / ' + card.defense
      };
    }
    else if (card.subType === EnumItemTypes.weapon) {
      return {
        att: card.attack,
        def: card.durability,
        label: 'Attack / Durability',
        value: card.attack + ' / ' + card.durability
      };
    }
  }
  
  return null;
};

Crystal.formatType = function (card) {
  return EnumCardTypes.nameForId(card.type)
    + ' ' + EnumCardTypes.nameForSubType(card.type, card.subType);
};

Crystal.formatFaction = function (card) {
  var result;
  var classes = EnumClasses.namesForArrayOfId(card.classes);
  
  if (card.faction === EnumFactions.neutral) {
    result = classes;
  }
  else {
    result = EnumFactions.nameForId(card.faction);
    
    if (classes !== 'neutral') {
      result = result + ' ' + classes;
    }
  }
  
  return result;
};

Crystal.formatTypeAndFaction = function (card) {
  var result = '';
  var faction = EnumFactions.nameForId(card.faction);
  var type = EnumCardTypes.nameForId(card.type);
  var subType = EnumCardTypes.nameForSubType(card.type, card.subType);
  var classes = EnumClasses.namesForArrayOfId(card.classes);

  if (card.type === EnumCardTypes.hero) {
    result =  faction + ' ' + type + ' - ' + classes;
  }
  else {
    if (faction !== 'neutral') {
      result += faction;
    }
    if (classes !== 'neutral') {
      result += classes;
    }

    result = (result || 'neutral') + ' ' + type;
    if (subType) {
      result = result + ' (' + subType + ')';
    }
  }
  return result;
};

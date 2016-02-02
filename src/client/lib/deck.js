// class Deck
Crystal.Deck = function (deckId) {
  this._isOK = false;
  this._deckId = null;
  this._name = null;
  this._heroId = null;
	this._cards = {};
  this.load(deckId || 'fake');
};

Crystal.Deck.prototype = {
	constructor: Crystal.Deck,
	
  load: function (deckId) {
    var deckCollection = (deckId === 'fake' ? FakeDecks : Decks)
    var dbDeck = deckCollection.findOne({ _id: deckId });

    if (dbDeck) {
      this._isOK = true;
      this._deckId = dbDeck._id;
      this._name = dbDeck.name || '';
      this._heroId = dbDeck.hero || null;
      this._cards = dbDeck.cards || {};
    }
    else {
      console.error('Deck.load : invalid deck id', deckId);
    }
  },

  isOK: function () {
    return this._isOK;
  },

  id: function () {
    return this._deckId;
  },
  
  name: function () {
    return this._name;
  },

	hasHero: function () {
		return this._heroId !== null;
	},
	
  heroId: function () {
    return this._heroId;
  },

	quantityForCardId: function (cardId) {
    if (cardId === this._heroId) {
      return 1;
    }
    else {
      return this._cards[cardId] || 0;
    }
	},
  
  cardCount: function () {
    var count = 0;
    this.forEach(function (cardId, quantity) {
      count += quantity;
    });
    return count;
  },

  // set the hero
	chooseHero: function (newHeroId) {
    var card = Cards.findOne(newHeroId);
    
		if (this.hasHero()) {
			console.error('Deck.chooseHero : error, we already have a hero', this.heroId());
			return -1;
		}
    
    if (card.type !== EnumCardTypes.hero) {
      console.error('Deck.chooseHero : this is not a hero', newHero, card);
      return -1;
    }
		
    this._heroId = card._id;
    this.writeCardsToDb();
    return 1;
	},
	
  // increase/decrease the quantity of a card
  // returns the new quantity (or -1 if error)
	addCard: function (cardId, increment) {
		var newQuantity;
    var card = Cards.findOne({ _id: cardId });
		
    if (! card) {
      console.error('Deck.addCard : error, this card id is invalid', cardId);
      return -1;
    }
    
    // edge case : the card is a hero
    if (card.type === EnumCardTypes.hero) {
      return this.chooseHero(cardId);
    }
    
		// TODO : la carte est-elle compatible avec le hero ?
    
    newQuantity = this.quantityForCardId(cardId) + increment;
		newQuantity = Math.max(newQuantity, 0);
		newQuantity = Math.min(newQuantity, 4);
    
    if (newQuantity === 0) {
      delete this._cards[cardId];
    }
    else {
      this._cards[cardId] = newQuantity;
    }
		
    this.writeCardsToDb();
		return newQuantity;
	},
  
  // remove all cards from this deck, including the hero
  reset: function () {
    this._heroId = null;
  	this._cards = {};
    this.writeCardsToDb();
  },
  
  writeCardsToDb: function () {
    var deckCollection = (this._deckId === 'fake' ? FakeDecks : Decks)

    deckCollection.update({ _id: this._deckId }, { 
      $set: { 
        hero: this._heroId,
        cards: this._cards,
        lastUpdate: new Date()
      }
    });
  },
  
  // the callback is called for each card in the deck, including the hero
  // callback = function (cardId, quantity, isHero)
  forEach: function (callback) {
    if (this._heroId) {
      callback(this._heroId, 1, true);
    }
    
    for (name in this._cards) {
  	  if (this._cards.hasOwnProperty(name)) {
  			callback(name, this._cards[name], false);
  		}
  	}
  },

  // same remaks as forEach
  map: function (callback) {
    var result = [];
    this.forEach(function (cardId, quantity, isHero) {
      result.push(callback(cardId, quantity, isHero));
    });
    return result;
  },

  // the ids of the cards used in this deck, including the hero
  // return an array of ids
	cardIds: function () {
    return this.map(function (cardId) {
      return cardId;
    });
	},
  
  stats: function () {
    var self = this;
    var subTypeArray, subTypeEnum;
    var result = {
      cardCount: 1, // for the hero
      classCardCount: 0,
      heroName: '',
      factionName: '',
      className: '',
      perType: [],
      perCastingCost: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    };
    var hero = Cards.findOne(this._heroId);
    
    if (hero) {
      result.heroName = hero.name;
      result.factionName = EnumFactions.nameForId(hero.faction);
      result.className = EnumClasses.nameForId(hero.classes[0]);
    }
    
    // init the couters
    EnumCardTypes.forEach(function (id, name) {
      result.perType[id] = {
        cardCount: 0,
        perSubType: []
      };
      
      subTypeArray = result.perType[id].perSubType;
      subTypeEnum = EnumCardTypes.getSubTypeEnum(id);
      
      if (subTypeEnum !== null) {
        subTypeEnum.forEach(function (id, name) {
          subTypeArray[id] = 0;
        });
      }
    });
    
    // counting cards
    this.forEach(function (cardId, qty, isHero) {
      var card;
      
      if (isHero === false) {
        card = Cards.findOne(cardId);

        if (card) {
          result.cardCount += qty;
          result.perType[card.type].cardCount += qty;
          result.perType[card.type].perSubType[card.subType] += qty;
          result.perCastingCost[card.castingCost] += qty;
          
          if (card.classes.length === 1 && card.classes[0] === hero.classes[0]) {
            result.classCardCount += qty;
          }
        }
        else {
          console.debug('Deck.stats() : this card doesn\'t exist', cardId, qty);
        }
      }
    });
    return result;
  },
  
  multiply: function (max, count) {
    var i, result = 1;
    for (i = 0; i < count; ++i) {
      result *= max;
      --max;
    }
    return result;
  },
  
  proba: function () {
    var self = this;
    var i;
    var deckSize = self.cardCount() - 1; // remove the hero
    var draw = 7;
    var divisor = self.multiply(deckSize, draw);
    var p = [];
    var result = {};

    p[0] = 0;
    for (i = 1; i <= 4; ++i) {
      p[i] = 1 - (self.multiply(deckSize - i, draw) / divisor);
    }
    
    this.forEach(function (cardId, qty, isHero) {
      if (isHero === false) 
        result[cardId] = p[qty];
    });
    return result;
  }
};

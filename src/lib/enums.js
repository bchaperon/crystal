if (typeof Crystal === 'undefined') {
	Crystal = {};
}


// class Enum
Crystal.Enum = function (obj) {
	var id, name;

	obj = obj || {};

  // the argument is an array or an object ?
  if (obj instanceof Array) {
    for (id = 0; id < obj.length; ++id) {
      name = obj[id];
      this[name] = id;
    }
  }
  else {
    for (name in obj) {
  	  if (obj.hasOwnProperty(name)) {
  			id = obj[name];
        this[name] = id;
  		}
  	}
  }
};

Crystal.Enum.prototype = {
	constructor: Crystal.Enum,

	nameForId: function (idToFind) {
    var result = '';
    this.forEach(function (id, name) {
      if (id === idToFind && name !== 'none') {
        result = name;
      }
    });
    return result;
	},

	// array qui imite une collection
	toArray: function () {
    return this.toArrayExcluding(null);
	},

  toArrayExcluding: function (idToExclude) {
    var result = [];
    this.forEach(function (id, name) {
      if (id !== idToExclude) {
        result.push({ _id: id, name: name });
      }
    });
    return result;
  },

	// liste des id
	values: function () {
    return this.valuesExcluding(null);
	},

	// liste de tous les id, sauf un
  valuesExcluding: function (idToExclude) {
    var result = [];
    this.forEach(function (id, name) {
      if (id !== idToExclude) {
        result.push(id);
      }
    });
    return result;
  },

  // function callback(id, name)
  forEach: function (callback) {
    var id, name;

    for (name in this) {
  	  if (this.hasOwnProperty(name)) {
  			id = this[name];
        if (typeof id === 'number' || typeof id === 'string') {
          callback(id, name);
        }
  		}
  	}
  },

  // function callback(id, name)
  map: function (callback) {
    var result = [];
    this.forEach(function (id, name) {
      result.push(callback(id, name));
    });
    return result;
  },

  // function callback(id, name)
  filter: function (callback) {
    var result = [];
    this.forEach(function (id, name) {
      if (callback(id, name)) {
        result.push({ _id: id, name: name });
      }
    });
    return result;
  }
};


// --------------------------

// card types
EnumCardTypes = new Crystal.Enum({
	hero: 0,
	ally: 1,
	ability: 2,
	item: 3,
  location: 4
});

EnumCardTypes.getSubTypeEnum = function (type) {
  switch (type) {
  case EnumCardTypes.ally:
    return EnumAllyTypes;
  case EnumCardTypes.ability:
    return EnumAbilityTypes;
  case EnumCardTypes.item:
    return EnumItemTypes;
  case EnumCardTypes.location:
    return EnumLocationTypes;
  default:
    return null;
  }
};


EnumCardTypes.nameForSubType = function (type, subType) {
  var e = EnumCardTypes.getSubTypeEnum(type);
  return (e ? e.nameForId(subType) : '');
};

// factions
EnumFactions = new Crystal.Enum({
	human: 0,
	shadow: 1,
	neutral: 2
});

// classes
EnumClasses = new Crystal.Enum({
  warrior: 0,
  hunter: 1,
  mage: 2,
  priest: 3,
  rogue: 4,
  wulven: 5,
  elemental: 6,
  neutral: 9
});

EnumClasses.namesForArrayOfId = function (array) {
  var self = this;
  return array.map(function (id) {
    return self.nameForId(id);
  }).join(' ');
}

// ally types
EnumAllyTypes = new Crystal.Enum({
	none: 0,
  aldmor: 10,
  homunculus: 80,
  ravager: 180,
  templar: 200,
  twilight: 207,
  undead: 210,
  wulven: 230,
  yari: 250
});

EnumAbilityTypes = new Crystal.Enum({
	none: 0,
	support: 1,
	attachment: 2
});

EnumItemTypes = new Crystal.Enum({
	artifact: 0,
	trap: 1,
	armor: 2,
	weapon: 3
});

EnumLocationTypes = new Crystal.Enum([
  'balor', 'ogmaga', 'thriss', 'tinnal', 'scheuth'
])

// attack type : utile ? ou tags ?
EnumAttackType = new Crystal.Enum([
  'armed', 'bow', 'claw', 'arcane', 'electric', 'fire', 'ice', 'poison'
]);

// rarity
EnumRarities = new Crystal.Enum([
  'hero', 'common', 'uncommon', 'rare', 'epic', 'legendary'
]);

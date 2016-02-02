// a simple link to the card details page
Crystal.React.LinkToCard = React.createClass({
  render: function () {
    var card = this.props.card;
    var cardDetailPath;
    
    if (card) {
      cardDetailPath = Router.path('card.view', { _id: card._id });
      return ( <a href={cardDetailPath}>{card.name}</a> );
    }
    else {
      return null;
    }
  }
});

// a span to display the rarity of a card
Crystal.React.Rarity = React.createClass({
  getDefaultProps: function () {
    return {
      value: EnumRarities.common,
      short: true,
      displayCommon: false
    };
  },
  
  render: function () {
    var rarity = this.props.value;
    var label = null;
    var color = null;
    var style = null;
    
    if (rarity !== EnumRarities.common || this.props.displayCommon) {
      label = EnumRarities.nameForId(rarity);
    }
    if (label && this.props.short) {
      label = label.substring(0, 1);
    }
    
    switch (rarity) {
    case EnumRarities.hero:
    case EnumRarities.uncommon:
      color = '#18cd00';
      break;
    case EnumRarities.rare:
      color = '#0080ff';
      break;
    case EnumRarities.epic:
      color = '#b048f8';
      break;
    case EnumRarities.legendary:
      color = '#ffaa00';
      break;
    }
    
    if (color) {
      style = { color: color };
    }
    
    return ( <span className='capitalize' style={style}>{label}</span> );
  }
});

// a span to display the card flags : unique, restricted
Crystal.React.UniqueAndRestricted = React.createClass({
  getDefaultProps: function () {
    return {
      className: null,
      card: {}
    };
  },

  render: function () {
    var result = null;
    var className = this.props.className;
    var card = this.props.card;
    
    if (card.unique && card.restricted) {
      result = ( <span className={className}>Unique <em>Restricted</em></span> );
    }
    else if (card.unique) {
      result = ( <span className={className}>Unique</span> );
    }
    else if (card.restricted) {
      result = ( <em className={className}>Restricted</em> );
    }
    else {
      result = ( <span className={className}></span> );
    }
    return result;
  }
});

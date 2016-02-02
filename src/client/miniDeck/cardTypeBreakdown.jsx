Crystal.React.CardTypeBreakdown = React.createClass({

  getDefaultProps: function () {
    return {
      deckStats: { cardCount: 42 } // fake data, for easy testing
    };
  },

  // no state

  makeTypeItem: function (name, stat, enumSubTypes) {
    var text = '';
    var subItems = [];
    
    text += stat.cardCount + ' ' + name;
    
    if (enumSubTypes) {
      enumSubTypes.forEach(function (subTypeId, subTypeName) {
        var quantity = stat.perSubType[subTypeId];
      
        if (quantity > 0 && subTypeName !== 'none') {
          subItems.push(quantity + ' ' + subTypeName);
        }
      });
    }

    if (subItems.length > 0) {
      text = text + ' (' + subItems.join(', ') + ')';
    }

    return (<span key={name}>{text}<br/></span>)
  },


  // ------------------------

  render: function () {
    var self = this;
    var deckStats = this.props.deckStats;
    var title = deckStats.cardCount + ' cards';
    var items = [];
    
    if (deckStats.classCardCount > 0) {
      title += (' (' + deckStats.classCardCount + ' ' + deckStats.className + ' cards)');
    }
    
    // for each card type, make an item
    EnumCardTypes.map(function (id, name) {
      var stat = deckStats.perType[id];
      var enumSubType = EnumCardTypes.getSubTypeEnum(id);
      
      if (id !== EnumCardTypes.hero) {
        items.push(self.makeTypeItem(name, stat, enumSubType));
      }
    });
    
    return (
			<div className='deck-stats'>
				<div className='deck-stats-title'>{title}</div>
        <div className='deck-stats-items'>{items}</div>
			</div>
    );
  }
});

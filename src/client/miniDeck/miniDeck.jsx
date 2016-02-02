// React class to display a deck, in a very compact and simple way
Crystal.React.MiniDeck = React.createClass({
  mixins: [Crystal.React.SaveStateMixin],
  
  getDefaultProps: function () {
    return {
      deck: null, // the deck to display
      embedded: false,
      uniqueName: 'miniDeck'
    };
  },
  
  getInitialState: function () {
    if (this.props.deck === null) {
      return { selectedCardId: null };
    }
    else {
      return { selectedCardId: this.props.deck.heroId() };
    }
  },
  
  // ------------------------
  
  onCardClick: function (cardId) {
    this.setState({ selectedCardId: cardId });
  },
  
  // ------------------------
  
  render: function () {
    var self = this;
    var CardItemImage = Crystal.React.CardItemImage;
    var CastingCostBreakdown = Crystal.React.CastingCostBreakdown;
    var CardTypeBreakdown = Crystal.React.CardTypeBreakdown;
    var deck = this.props.deck;
    var deckStats = deck.stats();
    var deckProba = deck.proba();
    var selectedCardId = this.state.selectedCardId;
    var selectedCard = null;
    var cards;
    var htmlCardRows;
    
    // the selected card is still part of the deck, or not ?
    // if not, we select the hero
    if (selectedCardId !== null && deck.quantityForCardId(selectedCardId) === 0) {
      selectedCardId = deck.heroId();
    }
    selectedCard = Cards.findOne(selectedCardId);

    // get the cards, sorted by type (to have the hero on top)
    cards = Cards.find(
      { _id: { $in: deck.cardIds() } },
      { sort: { type: 1, subType: 1, rank: 1 } }
    );
    
    // for each card of the deck, make a table row
    htmlCardRows = cards.map(function (card) {
      var quantity = deck.quantityForCardId(card._id);
      var proba = deckProba[card._id];
      var className = (card._id === selectedCardId) ? 'selected' : 'selectable';
      
      return ( 
        <li key={card._id} className={className}
            onClick={self.onCardClick.bind(self, card._id)}>
          {quantity}x {card.name}
        </li>
      );
    });
    // end of cards.map
    
    return (
    <div className='mini-deck'>
      <CardItemImage card={selectedCard} 
        deck={selectedCard.type === EnumCardTypes.hero ? null : deck}
        embedded={this.props.embedded}
        className='mini-deck-image' />
        
      <ul className='mini-deck-card-list'>{htmlCardRows}</ul>

      <div className='mini-deck-stats'>
    	  <CardTypeBreakdown deckStats={deckStats} />
        <CastingCostBreakdown costs={deckStats.perCastingCost} />
      </div>
    </div>
    );
  }
});

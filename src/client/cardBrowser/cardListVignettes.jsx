// React class to display a set of cards as small blocks (vignettes)
Crystal.React.CardListVignettes = React.createClass({
  
  getDefaultProps: function () {
    return { 
      cards: [], // the cards to display
      deck: null // the deck to edit
    };
  },
  
  // no state
  
  render: function () {
    var self = this;
    var vignettes;
    
    vignettes = this.props.cards.map(function (card) {
      return ( <CardVignette key={card._id} card={card} deck={self.props.deck} /> );
    });
    
    return ( <div>{vignettes}</div> );
  }
});


var CardVignette = React.createClass({
  render: function () {
    var LinkToCard = Crystal.React.LinkToCard;
    var UniqueAndRestricted = Crystal.React.UniqueAndRestricted;
    var Rarity = Crystal.React.Rarity;
    var AddRemoveCard = Crystal.React.AddRemoveCard;
    var card = this.props.card;
    var deck = this.props.deck;
    var attDef = Crystal.attackDefInfos(card);
    var castingCostHtml = null;
    var attDefHtml = null;
    var addRemoveCardHtml = null;
    var description2Html = null;
    
    if (card.type === EnumCardTypes.location) {
      description2Html = (
        <div className='stacked-block-with-space vignette-description'>
          {card.opposingDescription}
        </div>
      )
    }
    
    if (card.castingCost !== null) {
      castingCostHtml = (
        <span className='vignette-casting-cost'>{card.castingCost}</span>
      );
    }
    
    if (attDef) {
      if (attDef.label !== null) {
        attDefHtml = ( <span className='vignette-att-def'>{attDef.value}</span> );
      }
    }
    
    if (deck) {
      addRemoveCardHtml = ( <AddRemoveCard card={card} deck={deck} /> );
    }

    return (
      <section className='card-vignette card-item'>
        {castingCostHtml}
        {attDefHtml}

        <div className='vignette-name'><LinkToCard card={card} /></div>

        <div className='vignette-type'>
          {Crystal.formatTypeAndFaction(card) + ' '}
          <UniqueAndRestricted card={card} />
        </div>

        <div className='stacked-block-with-space vignette-description'>
          {card.description}
        </div>

        {description2Html}

        <div className='stacked-block-with-space clear-float-after'>
          {addRemoveCardHtml}
          <small>
            <Rarity value={card.rarity} />
            <span> {card._id} </span>
            <span className='vignette-tags'>{card.tags.join(' ')}</span>
          </small>
        </div>
      </section>
    );
  }
});


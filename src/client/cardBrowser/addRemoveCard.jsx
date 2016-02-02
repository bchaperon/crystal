
Crystal.React.AddRemoveCard = React.createClass({
  render: function () {
    var deck = this.props.deck;
    var cardId = this.props.card._id;
    var quantity = deck.quantityForCardId(cardId);
    var quantityLabel;
    var quantityHtml = null;
    var removeButtonHtml = null;
    
    if (quantity) {
      quantityLabel = quantity + 'x';
    }
    else {
      quantityLabel = ' ';
    }
    
    if (deck.hasHero()) {
      removeButtonHtml = (
        <input type='button' className='remove pure-button pure-button-primary'
          value='-' disabled={quantity === 0}
          onClick={deck.addCard.bind(deck, cardId, -1)} />
      );
      
      quantityHtml = ( <span className='quantity'>{quantityLabel}</span> );
    }
    
    return (
			<div className='add-remove-card add-remove-card-ex'>
        {removeButtonHtml}
        
				{quantityHtml}
        
				<input type='button'
          className={deck.hasHero() ? 
            'add pure-button pure-button-primary' : 'choose pure-button pure-button-primary'}
          value={deck.hasHero() ? '+' : 'Choose'}
          disabled={quantity === 4}
          onClick={deck.addCard.bind(deck, cardId, 1)} />
			</div>
    );
  }
});

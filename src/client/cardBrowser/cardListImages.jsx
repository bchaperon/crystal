// React class to browse a set of cards 
Crystal.React.CardListImages = React.createClass({
  
  getDefaultProps: function () {
    return { 
      cards: [],  // the cards to display
      deck: null, // the deck to edit
      foil: false
    };
  },
  
  // render
  render: function () {
    var self = this;
    var CardItemImage = Crystal.React.CardItemImage;
    var deck = this.props.deck;
    var items;
    
    items = this.props.cards.map(function (card) {
      return ( <CardItemImage key={card._id} className='card-item' 
        card={card} deck={deck} foil={self.props.foil} /> );
    });
    
    return ( <div>{items}</div> );
  }
});

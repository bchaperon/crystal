// React class to browse a set of cards 
Crystal.React.DeckBuilder = React.createClass({

  getDefaultProps: function () {
    return {
      deck: null // the deck to edit (mandatory)
    };
  },
  
  render: function () {
    var deck = this.props.deck;
    
    if (deck.hasHero()) {
      return (<Crystal.React.EditDeck deck={deck} />);
    }
    else {
      return (<Crystal.React.ChooseHero deck={deck} />);
    }
  }
});

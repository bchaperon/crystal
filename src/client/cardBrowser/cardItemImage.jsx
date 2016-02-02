// React class to display a card as an image
Crystal.React.CardItemImage = React.createClass({
  
  getDefaultProps: function () {
    return {
      card: null,
      deck: null,
      embedded: false,
      className: '',
      foil: false
    };
  },
  
  render: function () {
    var AddRemoveCard = Crystal.React.AddRemoveCard;
    var card = this.props.card;
    var deck = this.props.deck;
    var embedded = this.props.embedded;
    var url = null;
    var editDeckHtml = null;
    var className = 'card-item-image ' + this.props.className;
    var imagePath = card.image(this.props.foil)
    
    if (deck && !embedded) {
      editDeckHtml = ( <AddRemoveCard card={card} deck={deck} /> );
    }
    
    if (!embedded) {
      url = Router.path('card.view', { _id: card._id });
    }
    
    return (
      <section className={className}>
        <a href={url}>
          <img className='pure-img' src={imagePath} alt={card.name} />
        </a>
        {editDeckHtml}
      </section>
    );
  }
});

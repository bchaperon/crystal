// React class to display a set of cards as a table
Crystal.React.CardListTable = React.createClass({
  getDefaultProps: function () {
    return { 
      cards: [], // the cards to display
      deck: null // the deck to edit
    };
  },

  // no state
  
  render: function () {
    var self = this;
    var dataRows;
    
    dataRows = self.props.cards.map(function (card) {      
      return (
        <CardListTableRow key={card._id} card={card} deck={self.props.deck} />
      );
    });
    
    return (
      <table className='std-table card-list-table'>
			  <thead>
			    <tr>
            {self.props.deck ? (<th>Deck</th>) : null}
            <th className='rarity-cell'>{/* Rarity */}</th>
            <th>Name</th>
					  <th>Faction</th>
					  <th>Type</th>
            <th>Cost</th>
            <th>Att/Def</th>
            <th className='description-cell'>Description</th>
            <th className='reference-cell'>Ref</th>
            <th className='tags-cell'>Tags</th>
				  </tr>
		    </thead>
        <tbody>
          {dataRows}
        </tbody>
      </table>
    );
  }
});

// a row of the table
// this is a local var
var CardListTableRow = React.createClass({
  /*
  shouldComponentUpdate: function (nextProps) {
    return nextProps.card._id !== this.props.card._id;
  },
  */
  
  render: function () {
    var AddRemoveCard = Crystal.React.AddRemoveCard;
    var Rarity = Crystal.React.Rarity;
    var LinkToCard = Crystal.React.LinkToCard;
    var UniqueAndRestricted = Crystal.React.UniqueAndRestricted;
    var card = this.props.card;
    var deck = this.props.deck;
    var attDef = Crystal.attackDefInfos(card);
    var addRemoveCardCell = null;

    // are we editing a deck ?
    if (deck) {
      addRemoveCardCell = ( <td><AddRemoveCard card={card} deck={deck} /></td> );
    }
    
    return (
    <tr key={card._id}>
      {addRemoveCardCell}
      <td className='rarity-cell'><Rarity value={card.rarity} /></td>
      <td><LinkToCard card={card} /></td>
      <td className='capitalize'>{Crystal.formatFaction(card)}</td>
      <td className='capitalize'>
        {Crystal.formatType(card) + ' '}
        <UniqueAndRestricted card={card} />
      </td>
      <td>{card.castingCost}</td>
      <td>{attDef ? attDef.value : null}</td>
      <td className='description-cell'>
        {card.description}
        {card.opposingDescription ? <hr/> : null}
        {card.opposingDescription}
      </td>
      <td className='reference-cell'><small>{card._id}</small></td>
      <td className='tags-cell tags'><small>{card.tags.join(' ')}</small></td>
    </tr>);
  }
});

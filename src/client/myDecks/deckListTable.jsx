var TableRow;

// Display a list of decks as a table
Crystal.React.DeckListTable = React.createClass({
  
  getDefaultProps: function () {
    return {
      decks: [] // a list of deck (from the mongo database, not a Crystal.Deck object)
    };
  },
  // no state
  
  render: function () {
    var decks = this.props.decks;
    var tableRows;
    
    tableRows = decks.map(function (deck) {
      return ( <TableRow key={deck._id} dbDeck={deck} /> );
    });
    
    return (
      <table className='std-table deck-list-table'>
        <thead>
          <tr>
            <th>Deck Name</th>
            <th>Hero</th>
            <th>Faction</th>
            <th>Class</th>
            <th>Cards</th>
            <th>{/* action links */}</th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    );
  }
});

TableRow = React.createClass({
  mixins: [Crystal.React.FormMixin],
  
  getDefaultProps: function () {
    return { dbDeck: null };
  },
  
  // ------------------------
  
  render: function () {
    var dbDeck = this.props.dbDeck;
    var deck = new Crystal.Deck(dbDeck._id);
    var stats = deck.stats();
    
    return (
      <tr>
        <td><a href={Router.path('deck.edit', { _id: deck.id() })}>{deck.name()}</a></td>
        <td>{stats.heroName}</td>
        <td className='faction-cell'>{stats.factionName}</td>
        <td className='faction-cell'>{stats.className}</td>
        <td>{deck.cardCount()}</td>
        <td><Crystal.React.DeckActions deck={deck} /></td>
      </tr>
    );
  }
});

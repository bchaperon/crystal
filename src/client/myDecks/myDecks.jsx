Crystal.React.MyDecks = React.createClass({

  // no props
  // no state
  
  render: function () {
    var decks = Decks.find({ user: Meteor.userId() }, { sort: { name: 1 } });
    
    return (
      <div className='centered-medium-width'>
        <Crystal.React.CreateDeck />
        <Crystal.React.DeckListTable decks={decks} />
        <Crystal.React.Login />
      </div>
    );
  }
});

// a widget to create a new deck
Crystal.React.CreateDeck = React.createClass({
  mixins: [Crystal.React.FormMixin],

  // no props

  getInitialState: function () {
    return {
      error: null
    }
  },
  
  onSubmit: function (event) {
    var self = this;
    var deckName = self.getStringValue('deckName');
    
    event.preventDefault();
    
    if (! deckName) {
      self.setState({ error: 'You must enter a name' });
      return;
    }
    
    Meteor.call('createDeck', deckName, function (error, result) {
      if (error) {
        self.setState({ error: error.reason });
      }
      else {
        Router.go('deck.edit', { _id: result });
      }
    });
  },
  
  render: function () {
    return (
      <form className='pure-form' onSubmit={this.onSubmit}>
        <fieldset>
          <legend>Start a New Deck</legend>
          <label for='deckName'>Deck Name </label>
          <input name='deckName' ref='deckName' type='text' required
            placeholder='My great deck' />
          <span> </span>
          <input type='submit' className='pure-button pure-button-primary' 
            value='New Deck' />
          <div className='error'>{this.state.error}</div>
        </fieldset>
      </form>
    );
  }
});

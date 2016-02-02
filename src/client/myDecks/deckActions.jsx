var EnumActions = new Crystal.Enum([
  'rename', 'duplicate', 'reset', 'delete', 'share'
]);

// Display and perform a list of actions for a deck
// delete, reset, rename, duplicate, etc...
Crystal.React.DeckActions = React.createClass({
  mixins: [Crystal.React.FormMixin],
  
  getDefaultProps: function () {
    return {
      deck: null, // a Crystal.Deck object
      className: ''
    };
  },
  
  getInitialState: function () {
    return { 
      action: null
    }
  },
  
  // ------------------------
  
  cancelAction: function () {
    this.setState({ action: null });
  },

  onActionShare: function () {
    this.setState({ action: EnumActions.share });
  },
  
  onActionRename: function () {
    this.setState({ action: EnumActions.rename });
  },
  
  actuallyRename : function (event) {
    var newName = this.getStringValue('deckName');
    event.preventDefault();
    Decks.update(this.props.deck.id(), { $set: { name: newName } });
    this.cancelAction();
  },
  
  onActionReset: function () {
    this.setState({ action: EnumActions.reset });
  },

  actuallyReset : function (event) {
    event.preventDefault();
    this.props.deck.reset();
    this.cancelAction();
  },
  
  onActionDelete: function () {
    this.setState({ action: EnumActions.delete });
  },

  actuallyDelete : function (event) {
    event.preventDefault();
    Decks.remove(this.props.deck.id());
    this.cancelAction();
    Router.go('/decks');
  },
  
  
  // ------------------------
  
  render: function () {
    var deck = this.props.deck;
    var action = this.state.action;
    var cssClass = this.props.className + ' stacked-block-with-space';
    var actionLabel;
    var submitLabel;
    var onSubmit;

    if (action === EnumActions.rename) {
      return (
        <form className={cssClass}>
          <input ref='deckName' type='text' defaultValue={deck.name()} />
          <span> </span>
          <a href='' onClick={this.cancelAction}>Cancel</a>
          <span> </span>
          <input type='submit' className='pure-button pure-button-primary'
            value='Rename' onClick={this.actuallyRename} />
        </form>
      );
    }
    else if (action === EnumActions.reset) {
      return (
        <form className={cssClass}>
          <span>Reset this deck? </span>
          <a href='' onClick={this.cancelAction}>Cancel</a>
          <span> </span>
          <input type='submit' className='pure-button button-danger' 
            value='Reset' onClick={this.actuallyReset} />
        </form>
      );
    }
    else if (action === EnumActions.delete) {
      return (
        <form className={cssClass}>
          <span>Delete this deck? </span>
          <a href='' onClick={this.cancelAction}>Cancel</a>
          <span> </span>
          <input type='submit' className='pure-button button-danger' 
            value='Delete' onClick={this.actuallyDelete} />
        </form>
      );
    }
    else if (action === EnumActions.share) {
      return (
        <form className={cssClass}>
          <span>Send this link to your friends : </span>
          <pre>{Meteor.absoluteUrl(
            Router.path('deck.embedded', { _id: this.props.deck.id() }).substring(1)
          )}
          </pre>
          <a href='' onClick={this.cancelAction}>Close</a>
        </form>
      );
    }
    else {
      // no action in progress
      if (deck.id() === 'fake') {
        return (
          <div  className={cssClass}>
            <a href='' onClick={this.onActionReset}>Reset</a>
          </div>
        );
      }
      else {
        return (
          <div  className={cssClass}>
            <a href='' onClick={this.onActionDelete}>Delete</a>
            <span> </span>
            <a href='' onClick={this.onActionReset}>Reset</a>
            <span> </span>
            <a href='' onClick={this.onActionRename}>Rename</a>
            <span> </span>
            <a href='' onClick={this.onActionShare}>Share</a>
          </div>
        );
      }
    }
  }
});

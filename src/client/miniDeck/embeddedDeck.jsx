Crystal.React.EmbeddedDeck = React.createClass({

  getDefaultProps: function () {
    return {
      deck: null, // the deck to display
    };
  },

  render: function () {
    var deck = this.props.deck;
    
    return (
      <div className='embedded-deck'>
        <h2>{deck.name()}</h2>
        <Crystal.React.MiniDeck deck={deck} embedded={true} />
        <div className='footer'>
          Created with <a href={Meteor.absoluteUrl()}>Crystal</a>
        </div>
      </div>
    );
  }
});

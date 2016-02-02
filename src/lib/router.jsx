var Error404 = React.createClass({
  render: function () {
    return (<p className='centered-medium-width'>404, page not found</p>);
  }
});

// utility function to render a react component as the main content of the page
// we also manage a 'loading' screen
function render(selectedHeaderItem, component, props, ready) {
  ReactDOM.render(
    <div>
      <Crystal.React.Header selectedItem={selectedHeaderItem} />
      { ready === false ? 
        <Crystal.React.Loading /> : 
        React.createElement(component, props)
      }
      <footer></footer>
      <Crystal.React.ScrollToTop />
    </div>,
    document.getElementById('react-root'));
}

function render404() {
  render(' ', Error404);
}

// --------------------------

// home page
Router.route('/', function () {
  render('about', Crystal.React.About);
});

// card browser
Router.route('/cards', function () {
  render('cardBrowser', Crystal.React.CardBrowser);
});

// new card
Router.route('/cards/new', function () {
  if (Crystal.isAdmin()) {
    render('createCard', Crystal.React.EditCard);
  }
  else {
    render404();
  }
});

// edit card
Router.route('/cards/:_id/edit', function () {
  var card = Cards.findOne(this.params._id);
  
  if (card && Crystal.isAdmin()) {
    render('cardBrowser', Crystal.React.EditCard, { card: card });
  }
  else {
    render404();
  }
}, { name: 'card.edit' });

// card details
Router.route('/cards/:_id', function () {
  var card = Cards.findOne(this.params._id);
  
  if (card) {
    render('cardBrowser', Crystal.React.CardDetails, { card: card });
  }
  else {
    render404();
  }
}, { name: 'card.view' });

// deck builder : fake, for not loged in users
Router.route('/decks/fake/edit', function () {
  if (Meteor.user()) {
    this.redirect('/decks');
  }
  else {
    render('deckBuilder', Crystal.React.DeckBuilder, { deck: new Crystal.Deck('fake') });
  }
});

// deck builder : real, for loged in users
Router.route('/decks/:_id/edit', function () {
  var deck;

  if (! Meteor.user()) {
    render404();
  }
  else {
    deck = new Crystal.Deck(this.params._id);
    if (deck.isOK()) {
      render('decks', Crystal.React.DeckBuilder, { deck: deck });
    }
    else {
      render404();
    }
  }
}, { name: 'deck.edit' });

// embedded deck
Router.route('/decks/:_id/embedded', function () {
  var deck;

  this.wait(Meteor.subscribe('singleDeck', this.params._id));

  if (this.ready()) {
    deck = new Crystal.Deck(this.params._id);
    if (deck.isOK()) {
      React.render(<Crystal.React.EmbeddedDeck deck={deck} />, document.body);
    }
    else {
      render404();
    }    
  }
  else {
    React.render(<Crystal.React.Loading />, document.body);
  }
}, { name: 'deck.embedded' });

// the user page (his decks and login)
Router.route('/decks', function () {
  if (Meteor.user()) {
    render('decks', Crystal.React.MyDecks);
  }
  else {
    render('decks', Crystal.React.Login);
  }
});

/*
Router.route('stat', function () {
  var decks = Decks.find({}, { sort: { user: 1 } });
  var r = (
    <html>
      <head></head>
      <body>
        <ol>{decks.map(function (deck) {
          return (<li>{deck.user} {deck.name}</li>); 
        })}
        </ol>
      </body>
    </html>
  );
  this.response.end(React.renderToString(r));
}, { where: 'server' });
*/

// default : 404 not found
Router.route('/(.*)', function () { 
  render404();
});

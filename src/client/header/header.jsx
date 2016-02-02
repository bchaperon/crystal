// React class to browse a set of cards 
Crystal.React.Header = React.createClass({
  
  getDefaultProps: function () {
    return {
      selectedItem: null // the selected item in the menu
    };
  },
  
  signOut: function () {
    Meteor.logout();
  },
  
  render: function () {
    var selected = this.props.selectedItem;
    var c = function (str) {
      if (str === selected)
         return 'nav-item selected';
      else
        return 'nav-item selectable';
    };
    var deckBuilderHtml = null;
    var createCardHtml = null;
    
    if (Meteor.user()) {
      
    }
    else {
      deckBuilderHtml = (
        <a href='/decks/fake/edit' className={c('deckBuilder')}>Deck Builder</a>
      );
    }
    
    if (Crystal.isAdmin()) {
      createCardHtml = (
    		<a href='/cards/new' className={c('createCard')}>New Card</a>
      );
    }
    
    return (
    	<nav className='nav'>
    		<a href='/' className={c('about')}>Crystal</a>
    		<a href='/cards' className={c('cardBrowser')}>Card Browser</a>
        {deckBuilderHtml}
        <a href='/decks' className={c('decks')}>My Decks</a>
        {createCardHtml}
    	</nav>
    );
  }
});

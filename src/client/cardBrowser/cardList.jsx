var sortingList = {
  'rank': { rank: 1 },
  'rarity': { rarity: 1, rank: 1 },
  'name': { name: 1 },
  'type': { type: 1, subType: 1, rank: 1 },
  'faction' : { faction: 1, classes: 1, rank: 1 },
  'cost': { castingCost: 1, rank: 1 },
  'costInv': { castingCost: -1, rank: -1 },
}

// React class to browse a set of cards 
Crystal.React.CardList = React.createClass({
  mixins: [Crystal.React.SaveStateMixin],
  
  getDefaultProps: function () {
    return {
      uniqueName: null,
      mongoFilter: {}, // the mongo filter to select the cards
      deck: null, // the deck to edit
      defaultSortMode: null
    };
  },
  
  getInitialState: function () {
    return {
      displayMode: 'vignettes',
      sortMode: this.props.defaultSortMode || 'rank'
    };
  },

  // -----------------------
  
  handleDisplayModeChange: function () {
    this.setState({ 
      displayMode: this.refs.displayMode.getDOMNode().value
    });
  },
  
  handleSortChange: function () {
    var sortMode = this.refs.sort.getDOMNode().value;
    this.setState({ sortMode: sortMode });
  },
  

  // ------------------------
  
  render: function () {
    var cards;
    var CardListXxx;
    var foil = false;
    var mongoSort = sortingList[this.state.sortMode];
    
    // get the data
    var start = Date.now()
    cards = Cards.find(this.props.mongoFilter, { sort: mongoSort }).fetch();
    var end = Date.now()
    console.debug('find cards in ' + (end - start) + 'ms')

    // do we have some cards ?
    if (cards.length === 0) {
      return (
        <div className='stacked-block-with-space error'>
          There are no cards that match your search criteria.
    	  </div>
      );
    }
    
    // how do we display these cards ?
    if (this.state.displayMode === 'images') {
      CardListXxx = Crystal.React.CardListImages;
    }
    else if (this.state.displayMode === 'imagesFoil') {
      CardListXxx = Crystal.React.CardListImages
      foil = true
    }
    else if (this.state.displayMode === 'vignettes') {
      CardListXxx = Crystal.React.CardListVignettes;
    }
    else {
      CardListXxx = Crystal.React.CardListTable;      
    }
    
    return ( 
      <div>
    		<div className='stacked-block-with-space'>
  				<strong>{cards.length} cards. </strong>
          
          <span className='text-block'>
            <span>Display as </span>
            <select ref='displayMode' value={this.state.displayMode}
                    onChange={this.handleDisplayModeChange}>
    					<option value='vignettes'>vignettes</option>
    					<option value='table'>table</option>
    					<option value='images'>images</option>
    					<option value='imagesFoil'>images (foil)</option>
    				</select>
          </span>
          
          <span className='text-block'>
            <span> Sort by </span>
            <select ref='sort' value={this.state.sortMode} 
                    onChange={this.handleSortChange}>
    					<option value='rank'>reference</option>
    					<option value='rarity'>rarity</option>
    					<option value='name'>name</option>
    					<option value='faction'>faction</option>
    					<option value='type'>type</option>
    					<option value='cost'>casting cost 0..7</option>
    					<option value='costInv'>casting cost 7..0</option>
    				</select>
          </span>
    		</div>
        
        <CardListXxx cards={cards} deck={this.props.deck} foil={foil} />
      </div>
    );
  }
});

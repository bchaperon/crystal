// React class to browse a set of cards 
Crystal.React.EditDeck = React.createClass({
  mixins: [Crystal.React.SaveStateMixin],
  
  getDefaultProps: function () {
    return {
      uniqueName: 'editDeck',
      deck: null // the deck to edit
    };
  },
  
  getInitialState: function () {
    var hero = Cards.findOne(this.props.deck.heroId()) || { classes: [] };

    return {
      deckId: this.props.deck.id(),
      classes: hero.classes.concat(EnumClasses.neutral),
      types: EnumCardTypes.valuesExcluding(EnumCardTypes.hero),
      castingCosts: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      cardSets: CardSets.find({ beta: false }).map(function (cardSet) { 
        return cardSet._id; 
      }),
      tags: []
    };
  },
  
  shouldRestoreState: function (state) {
    return state.deckId === this.props.deck.id();
  },
  
  componentWillMount: function () {
    window.scrollTo(0, 0);
  },

  // ------------------------
  
  handleResetDeck: function () {
    this.props.deck.reset();
  },
  
  handleClassesFilterChange: function (selectedItems) {
    this.setState({ classes: selectedItems });
  },
  
  handleTypesFilterChanged: function (selectedItems) {
    this.setState({ types: selectedItems });
  },
  
  handleCastingCostFilterChange: function (selectedItems) {
    this.setState({ castingCosts: selectedItems });
  },
  
  handleCardSetFilterChange: function (selectedItems) {
    this.setState({ cardSets: selectedItems });
  },
  
  handleTagFilterChange: function (tags) {
    this.setState({ tags: tags });
  },
  
  // ------------------------
  
  render: function () {
    var Filter = Crystal.React.Filter;
    var CastingCostFilter = Crystal.React.CastingCostFilter;
    var CardSetFilter = Crystal.React.CardSetFilter;
    var TagFilter = Crystal.React.TagFilter;
    var CardList = Crystal.React.CardList;
    
    var deck = this.props.deck;
    var hero = Cards.findOne(this.props.deck.heroId());
    var classItems;
    var mongoFilter;
    
		mongoFilter = {
      restricted: false,
      type: { $in: this.state.types },
			faction: { $in: [ hero.faction, EnumFactions.neutral ] },
			classes: { $in: this.state.classes },
      castingCost: { $in: this.state.castingCosts },
      cardSet: { $in: this.state.cardSets }
		};
    if (this.state.tags.length > 0) {
      mongoFilter.tags = { $all: this.state.tags };
    }

    // items to display the class filter
    classItems = EnumClasses.filter(function (id, name) {
      return id == EnumClasses.neutral || hero.classes.indexOf(id) !== -1;
    });

    return ( 
    <div className='deck-builder-container'>
      <h2>{deck.name()}</h2>

      <Crystal.React.DeckActions className='deckActionInDeckBuilder' deck={deck} />

      {/* Display the deck itself */}
  		<aside className='deck-builder-aside'>
        <Crystal.React.MiniDeck deck={this.props.deck} />
    	</aside>

      {/* Display the filters and the card list */}
    	<div className='deck-builder-main'>
        {/* the filters */}
        <section className='filter-container'>
          <Filter title='classes'
            items={classItems} 
            selected={this.state.classes}
            onChange={this.handleClassesFilterChange}/>
          
          <Filter title='types'
            items={EnumCardTypes.toArrayExcluding(EnumCardTypes.hero)} 
            selected={this.state.types}
            onChange={this.handleTypesFilterChanged} />
          
          <CastingCostFilter
            selected={this.state.castingCosts}
            onChange={this.handleCastingCostFilterChange} />
        
          <CardSetFilter
            selected={this.state.cardSets}
            onChange={this.handleCardSetFilterChange} />
        
          <TagFilter
            defaultValue={this.state.tags} 
            onChange={this.handleTagFilterChange} />
        </section>
        
        {/* the card list */}
        <CardList mongoFilter={mongoFilter} deck={deck}
          uniqueName={this.props.uniqueName + '.cardList'} />
    	</div>
    </div>);
  }
});

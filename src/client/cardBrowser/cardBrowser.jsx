
// React class to browse the cards
Crystal.React.CardBrowser = React.createClass({
  mixins: [Crystal.React.SaveStateMixin],
  
  getDefaultProps: function () {
    return {
      uniqueName: 'cardBrowser'
    };
  },
  
  getInitialState: function () {
    return {
      factions: EnumFactions.values(),
      classes: EnumClasses.values(),
      types: EnumCardTypes.values(),
      castingCosts: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      cardSets: CardSets.find().map(function (cardSet) { return cardSet._id; }),
      rarities: EnumRarities.values(),
      tags: []
    };
  },

  // ------------------------
  
  handleFactionsFilterChange: function (selectedItems) {
    this.setState({ factions: selectedItems });
  },

  handleClassesFilterChange: function (selectedItems) {
    this.setState({ classes: selectedItems });
  },

  handleTypesFilterChange: function (selectedItems) {
    this.setState({ types: selectedItems });
  },
  
  handleCastingCostFilterChange: function (selectedItems) {
    this.setState({ castingCosts: selectedItems });
  },
  
  handleCardSetFilterChange: function (selectedItems) {
    this.setState({ cardSets: selectedItems });
  },
  
  handleRarityFilterChange: function (selectedItems) {
    this.setState({ rarities: selectedItems });
  },
  
  handleTagFilterChange: function (tags) {
    this.setState({ tags: tags });
  },

  // ------------------------

  render: function () {
    var Filter = Crystal.React.Filter;
    var CastingCostFilter = Crystal.React.CastingCostFilter;
    var CardSetFilter = Crystal.React.CardSetFilter;
    var RarityFilter = Crystal.React.RarityFilter;
    var TagFilter = Crystal.React.TagFilter;
    var CardList = Crystal.React.CardList;
    var mongoFilter;

    mongoFilter = {
      faction: { $in: this.state.factions },
      classes: { $in: this.state.classes },
      type: { $in: this.state.types },
      $or: [ 
        { castingCost: { $in: this.state.castingCosts } }, 
        { castingCost: null } // don't forget the heroes ! their casting cost is null ! 
      ],
      cardSet: { $in: this.state.cardSets },
      rarity: { $in: this.state.rarities }
    }
    if (this.state.tags.length > 0) {
      mongoFilter.tags = { $all: this.state.tags };
    }

    return (
    <div className='card-browser-container'>
      <section className='filter-container'>
        <Filter title='factions'
          items={EnumFactions.toArray()} 
          selected={this.state.factions}
          onChange={this.handleFactionsFilterChange} />
    
        <Filter title='classes'
          items={EnumClasses.toArray()} 
          selected={this.state.classes}
          onChange={this.handleClassesFilterChange}/>
      
        <Filter title='types'
          items={EnumCardTypes.toArray()} 
          selected={this.state.types}
          onChange={this.handleTypesFilterChange}/>
      
        <CastingCostFilter
          selected={this.state.castingCosts}
          onChange={this.handleCastingCostFilterChange} />
      
        <CardSetFilter
          showBeta={true}
          selected={this.state.cardSets}
          onChange={this.handleCardSetFilterChange} />

        <RarityFilter
          selected={this.state.rarities}
          onChange={this.handleRarityFilterChange} />

        <TagFilter defaultValue={this.state.tags} 
          onChange={this.handleTagFilterChange} />
      </section>
      
      <CardList mongoFilter={mongoFilter} 
        uniqueName={this.props.uniqueName + '.cardList'} />
    </div>
    );
  }
});

// React class to browse a set of cards 
Crystal.React.ChooseHero = React.createClass({
  mixins: [Crystal.React.SaveStateMixin],
  
  getDefaultProps: function () {
    return {
      uniqueName: 'chooseHero',
      deck: null // the deck to edit (mandatory)
    };
  },
  
  getInitialState: function () {
    return {
      factions: EnumFactions.values(),
      classes: EnumClasses.values(),
      tags: []
    };
  },
  
  componentWillMount: function () {
    window.scrollTo(0, 0);
  },
  
  // ------------------------
  
  handleFactionsFilterChange: function (selectedItems) {
    this.setState({ factions: selectedItems });
  },
  
  handleClassesFilterChange: function (selectedItems) {
    
    this.setState({ classes: selectedItems });
  },
  
  handleTagFilterChange: function (tags) {
    this.setState({ tags: tags});
  },
  
  // ------------------------
  
  render: function () {
    var self = this;
    var Filter = Crystal.React.Filter;
    var TagFilter = Crystal.React.TagFilter;
    var CardList = Crystal.React.CardList;
    var deck = this.props.deck;
    var mongoFilter;
    
    mongoFilter = {
      restricted: false,
      type: EnumCardTypes.hero,
      faction: { $in: this.state.factions },
      classes: { $in: this.state.classes }
    };
    if (this.state.tags.length > 0) {
      mongoFilter.tags = { $all: this.state.tags }
    }
    
    return (
    <div className='choose-hero-container'>
      <h2>Choose your hero</h2>
      
      <section className='filter-container'>
        <Filter title='factions'
          items={EnumFactions.toArrayExcluding(EnumFactions.neutral)} 
          selected={this.state.factions}
          onChange={this.handleFactionsFilterChange} />
      
        <Filter title='classes'
          items={EnumClasses.toArrayExcluding(EnumClasses.neutral)} 
          selected={this.state.classes}
          onChange={this.handleClassesFilterChange}/>

        <TagFilter defaultValue={this.state.tags}
          onChange={this.handleTagFilterChange} />
      </section>
      
      <CardList mongoFilter={mongoFilter} deck={deck}
        uniqueName='cardListInChooseHero' defaultSortMode='faction' />
    </div>
    );
  }
});

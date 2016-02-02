Crystal.React.RarityFilter = React.createClass({
  
  getDefaultProps: function () {
    return {
      selected: [],   // selected rarity ids
      onChange: null // callback to know when the filter has changed
    };
  },
  
  // no state
  
  // ------------------------
  
  render: function () {
    var Filter = Crystal.React.Filter;
    var items;

    items = EnumRarities.map(function (id, name) {
      return { _id: id, name: name.substring(0, 1) };
    });
    
    return (
      <Filter title='rarities'
        items={items} 
        selected={this.props.selected}
        onChange={this.props.onChange} />
    );
  }
});

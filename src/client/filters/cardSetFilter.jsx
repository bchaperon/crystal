Crystal.React.CardSetFilter = React.createClass({
  
  getDefaultProps: function () {
    return {
      selected: [],   // selected card set ids
      showBeta: false,
      onChange: null // callback to know when the filter has changed
    };
  },
  
  // no state
  
  // ------------------------
  
  render: function () {
    var filter = {}
    var items;
    
    if (!this.props.showBeta) {
      filter = { beta: false }
    }

    items = CardSets.find(filter).map(function (cardSet) {
      return { _id: cardSet._id, name: cardSet._id };
    });
    
    return (
      <Crystal.React.Filter title='sets'
        items={items} 
        selected={this.props.selected}
        onChange={this.props.onChange} />
    );
  }
});

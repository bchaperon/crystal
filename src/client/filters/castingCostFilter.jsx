Crystal.React.CastingCostFilter = React.createClass({
  
  getDefaultProps: function () {
    return {
      selected: [],   // selected casting costs : numbers from zero to ten (or more)
      onChange: null // callback to know when filter has changed
    };
  },
  
  // no state
  
  // ------------------------
  
  handleChange: function (selectedItems) {
    var selectedCosts = [];
    
    if (selectedItems.indexOf('s') !== -1) {
      selectedCosts = selectedCosts.concat(0, 1, 2);
    }
    if (selectedItems.indexOf('m') !== -1) {
      selectedCosts = selectedCosts.concat(3);
    }
    if (selectedItems.indexOf('l') !== -1) {
      selectedCosts = selectedCosts.concat(4);
    }
    if (selectedItems.indexOf('xl') !== -1) {
      selectedCosts = selectedCosts.concat(5, 6, 7, 8, 9, 10);
    }
    
    if (this.props.onChange !== null) {
      this.props.onChange(selectedCosts);
    }
  },
  
  // ------------------------
  
  render: function () {
    var Filter = Crystal.React.Filter;
    var items = [
      { _id: 's', name: '0-2' },
      { _id: 'm', name: '3' },
      { _id: 'l', name: '4' },
      { _id: 'xl', name: '5+' }
    ];
    var selectedCosts = this.props.selected;
    var selectedItems = [];
    
    if (selectedCosts.indexOf(0) !== -1) {
      selectedItems.push('s');
    }
    if (selectedCosts.indexOf(3) !== -1) {
      selectedItems.push('m');
    }
    if (selectedCosts.indexOf(4) !== -1) {
      selectedItems.push('l');
    }
    if (selectedCosts.indexOf(9) !== -1) {
      selectedItems.push('xl');
    }
    
    return (
      <Filter title='cost'
        items={items} 
        selected={selectedItems}
        onChange={this.handleChange} />
    );
  }
});

Crystal.React.Checkboxes = React.createClass({
  mixins: [Crystal.React.FormMixin],
  
  getDefaultProps: function () {
    return {
      items: [ 
        { _id: 'id1', name: 'name1' }, // fake data for easy testing
        { _id: 'id2', name: 'name2' }
      ],
      selected: [],
      onChange: null,    // callback (the argument is a list of selected items id)
      className: ''
    };
  },
  
  // no state
  
  // ------------------------
  
  getSelected: function () {
    var self = this;
    var result = [];

    self.props.items.forEach(function (item) {
      if (self.getBoolValue(item._id)) {
        result.push(item._id);
      }
    });

    return result;
  },
  
  handleChange: function () {
    if (this.props.onChange !== null) {
      this.props.onChange(this.getSelected());
    }
  },
  
  // ------------------------
  
  render: function () {
    var self = this;
    var LIs;

    LIs = self.props.items.map(function (item) {
      var selected = self.props.selected || [];
      var checked = selected.indexOf(item._id) !== -1;
      
      return ( 
        <li key={item._id}>
          <label>
            <input type='checkbox' ref={item._id} 
              defaultChecked={checked}
              onChange={self.handleChange} />{item.name}
          </label>
        </li>
      );
    });
    
    return ( <ul className={this.props.className}>{LIs}</ul> );
  }
});

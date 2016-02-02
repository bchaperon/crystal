Crystal.React.Filter = React.createClass({
  
  getDefaultProps: function () {
    return {
      title: 'no title',
      items: [],
      selected: [],
      onChange: null // callback to know when filter has changed
    };
  },
  
  getSelected: function () {
    return this.refs.cbx.getSelected();
  },
  
  render: function () {
    var Checkboxes = Crystal.React.Checkboxes;
    var cssClass = '';
    
    if (this.props.selected.length === 0) {
      cssClass = 'error'
    }
    
    return (
      <div className='filter'>
  		  <span className='filter-title'>{this.props.title}</span>
  		  <Checkboxes
          ref='cbx'
          className={cssClass}
          items={this.props.items} 
          selected={this.props.selected}
          onChange={this.props.onChange} />
  	  </div>
    );
  }
});

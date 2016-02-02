Crystal.React.ScrollToTop = React.createClass({
  // no props

  getInitialState: function () {
    return { 
      visible: false
    };
  },
  
  componentDidMount: function() {
    window.addEventListener('scroll', this.onScroll, false);
  },
  
  componentWillUnmount: function() {
    window.removeEventListener('scroll', this.onScroll, false);
  },
  
  onScroll: function (event) {
    var scrollOffset = window.pageYOffset || document.documentElement.scrollTop;
    var visible = (scrollOffset > 250);

    if (this.state.visible !== visible) {
      this.setState({ visible: visible })
    }
  },
  
  onClick: function () {
    window.scrollTo(0, 0);
  },
  
  render: function () {
    var style;
    
    if (this.state.visible) {
      style = { visibility: 'visible' };
    }
    else {
      style = { visibility: 'hidden' };
    }
    
    return ( 
      <a href='#' className='scroll-to-top' style={style} 
        onClick={this.onClick} >&#9650;</a>
    );
  }
});

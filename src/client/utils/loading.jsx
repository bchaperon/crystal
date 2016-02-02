Crystal.React.Loading = React.createClass({
  // no props
  
  getInitialState: function () {
    return { progress: 0 };
  },
  
  componentDidMount: function() {
    var self = this;
    self.interval = setInterval(this.updateProgress, 200);
    self.cardCount = 0;
    
    CardSets.find().forEach(function (cardSet) {
      self.cardCount += cardSet.actualNumberOfCards;
    });
  },
  
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },

  updateProgress: function() {
    this.setState({ progress: Cards.find({}).count() });
  },
  
  render: function () {
    var style;
    
    style = {
      'width': (this.state.progress * 100 / this.cardCount).toString() + '%'
    };
    
    return (
      <div className='loading'>
        <p>Now loading, please wait...<br/>This should take no more than a few seconds.</p>
        {/*
        <div className='progress-bar'>
          <div className='inner-progress-bar' style={style}></div>
          <div className='progress-text'>
            {this.state.progress} / {this.cardCount} cards
          </div>
        </div>
        */}
      </div>
    );
  }
});

Crystal.React.CastingCostBreakdown = React.createClass({

  getDefaultProps: function () {
    return {
      // an array of card count 
      // costs[Y] = X means that X cards have a casting cost of Y
      costs: [0, 1, 2, 3, 4, 5, 1] // fake data, for easy testing
    };
  },

  // ------------------------

  render: function () {
    var costs = this.props.costs;
    var i;
    var cardCount, maxCardCount = 0;
    var minCost = 1, maxCost = 5;
    var cardCountRow = [], dataRow = [], footerRow = [];
    var style;
    
    // search for the limit values
    for (i = 0; i < costs.length; ++i) {
      cardCount = costs[i];
      
      if (cardCount > maxCardCount) {
        maxCardCount = cardCount;
      }
      
      if (cardCount > 0) {
        if (i < minCost) {
          minCost = i;
        }
        if (i > maxCost) {
          maxCost = i;
        }
      }
    }
    
    // generate the table rows
    for (i = minCost; i <= maxCost; ++i) {
      cardCount = costs[i];
      height = (cardCount / maxCardCount) * 100;
      
      // display the card count for each casting cost
      cardCountRow.push(<td key={i}>{cardCount}</td>);
      
      // make a div with a height proportional to the number of cards
      if (cardCount > 0) {
        style = {
          height: height + 'px',
          marginTop: (100 - height) + 'px'
        };
        
        dataRow.push(
          <td key={i}><div className='graph-bar' style={style}></div></td>
        );
      }
      else {
        style = { height: '100px' };
        dataRow.push(<td key={i}><div style={style}></div></td>);
      }
      
      // the footer display the casting cost
      footerRow.push(<th key={i}>{i}</th>);
    }

    return (
      <table className='casting-cost-stats-table'>
        <thead>
          <tr><th colSpan={maxCost - minCost + 1}>Casting Cost Breakdown</th></tr>
        </thead>
        <tbody>
          <tr>{cardCountRow}</tr>
          <tr>{dataRow}</tr>
        </tbody>
        <tfoot>
          <tr>{footerRow}</tr>
        </tfoot>
      </table>
    );
  }
});

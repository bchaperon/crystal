// React class to display a specific card
Crystal.React.CardDetails = React.createClass({

  // the only prop is the card 
  getDefaultProps: function () {
    return { card: null };
  },
  
  getInitialState: function () {
    return {
      flip: false,
      alt: false
    }
  },
  
  onFlip: function () {
    this.setState({ flip: !this.state.flip })
  },
  
  render: function () {
    var card = this.props.card;
    var cardSet = CardSets.findOne(card.cardSet);
    var attackDefInfos = Crystal.attackDefInfos(card);
    var castingCostHtml = null;
    var attackDefHtml = null;
    var opposingDescriptionHtml = null;
    var cardDescription = '';
    var cardDescription2 = '';
    var editCardHtml = null;
    var navigationHtml = null;
    var previousCard, nextCard;
    
    cardSet = cardSet || { name: '', numberOfCards: 0 };
    
    if (card.description) {
      cardDescription = card.description.replace('\n', '<br/>');
    }
    if (card.opposingDescription) {
      cardDescription2 = card.opposingDescription.replace('\n', '<br/>');
    }
    
    if (card.type == EnumCardTypes.location) {
      opposingDescriptionHtml = (
        <tr>
          <th>Opposing<br/>Description</th>
          <td dangerouslySetInnerHTML={{__html: cardDescription2}}></td>
        </tr>
      )
    }
    
    if (card.type !== EnumCardTypes.hero) {
      castingCostHtml = (
        <tr>
          <th>Casting Cost</th>
          <td>{card.castingCost}</td>
        </tr>
      );
    }

    if (attackDefInfos !== null) {
      attackDefHtml = (
        <tr>
          <th>{attackDefInfos.label}</th>
          <td>{attackDefInfos.value}</td>
        </tr>
      );
    }
    
    if (Crystal.isAdmin()) {
      editCardHtml = (
        <a href={Router.path('card.edit', { _id: card._id })}>Edit</a>
      );
    }
    
    var imgStyle = {}
    if (this.state.flip) {
      imgStyle = {
        '-webkit-transform': 'rotate(180deg)',
            '-ms-transform': 'rotate(180deg)',
                'transform': 'rotate(180deg)'
      }
    }
    
    // find the next and previous card
    previousCard = Cards.findOne({ rank: { $lt: card.rank }}, { sort: { rank: -1 }});
    nextCard = Cards.findOne({ rank: { $gt: card.rank }}, { sort: { rank: 1 }});

    navigationHtml = (
      <table className='card-details-navigation'>
        <tbody>
          <tr>
            <td className='previous-card-cell'>
              <Crystal.React.LinkToCard card={previousCard} />
            </td>
            <td className='next-card-cell'>
              <Crystal.React.LinkToCard card={nextCard} />
            </td>
          </tr>
        </tbody>
      </table>
    );
    
    return (
      <div className='mo-container card-details-container'>
        {navigationHtml}
        
        <section className='mo-content'>
          <h2>{card.name}</h2>
          <table className='key-value-table card-details-table'>
            <tbody>
              <tr>
                <th>Type</th>
                <td className='capitalize'>
                  {Crystal.formatTypeAndFaction(card)}
                  <span> </span>
                  <Crystal.React.UniqueAndRestricted card={card} />
                </td>
              </tr>

              {castingCostHtml}
              {attackDefHtml}

              <tr>
                <th>Description</th>
                <td dangerouslySetInnerHTML={{__html: cardDescription}}>
                </td>
              </tr>
            
              {opposingDescriptionHtml}
              
              <tr>
                <th>Rarity</th>
                <td>
                  <Crystal.React.Rarity value={card.rarity} short={false} displayCommon={true} />
                </td>
              </tr>
            
              <tr>
                <th>Card Set</th>
                <td>{cardSet.name}, {card.rankInCardSet} / {cardSet.numberOfCards}</td>
              </tr>

              <tr>
                <th>Reference</th>
                <td>{card._id}</td>
              </tr>

              <tr>
                <th>Tags</th>
                <td className='tags'>{card.tags.join(' ')}</td>
              </tr>
            </tbody>
          
            <tfoot>
              <tr><td colSpan='2'>{editCardHtml}</td></tr>
            </tfoot>
          </table>
        </section>
        
        <section className='mo-image'>
          <img src={card.image()} alt={card.name}
               className='pure-img' style={ imgStyle } />
          <label style={{ display: card.type === EnumCardTypes.location ? 'inline' : 'none' }}>
            <input type='checkbox' value={this.state.flip} onChange={this.onFlip} />Flip
          </label>
        </section>
        
        {navigationHtml}
      </div>
    );
  }
});

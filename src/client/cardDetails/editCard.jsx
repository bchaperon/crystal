function options (array) {
  return array.map(function (item) {
    return <option key={item._id} value={item._id}>{item.name}</option> ;
  });
}

// React class to edit or create a card
Crystal.React.EditCard = React.createClass({
  mixins: [Crystal.React.FormMixin],

  getDefaultProps: function () {
    return {
      card: {
        _id: null,
        cardSet: 'lands',
        rankInCardSet: 1,
        type: EnumCardTypes.ally,
        subType: null,
        rarity: EnumRarities.common
      }
    };
  },

  getInitialState: function () {
    var card = this.props.card;
    return {
      cardSet: card.cardSet,
      rankInCardSet: card.rankInCardSet,
      imageUrl: card.imageUrl || '',
      flip: false,
      type: card.type,
      subType: card.subType
    };
  },

  // ------------------------
  // utils

  makeAttackDefHtml: function (name1, name2) {
    var card = this.props.card;

    if (name2) {
      return (
        <tr>
          <th>{name1}/{name2}</th>
          <td>
            <input ref={name1} type='number' min='0' max='9'
              defaultValue={card[name1]} /> /
            <input ref={name2} type='number' min='0' max='9'
              defaultValue={card[name2]} />
          </td>
        </tr>
      );
    }
    else {
      return (
        <tr>
          <th>{name1}</th>
          <td>
            <input ref={name1} type='number' min='0' max='9'
              defaultValue={card[name1]} />
          </td>
        </tr>
      );
    }
  },

  // ------------------------
  // handle change

  // refresh the state by getting values from the DOM
  // !!! don't use it to change the card type, it's a special case !!!
  handleChange: function () {
    this.setState({
      cardSet: this.getStringValue('cardSet'),
      rankInCardSet: this.getIntValue('rankInCardSet'),
      subType: this.getIntValue('cardSubType')
    });
  },

  // change type : make sure the subtype is coherent with the type
  handleChangeType: function () {
    var newType = this.getIntValue('cardType');
    var newSubType = null;

    switch (newType) {
    case EnumCardTypes.ally:
      newSubType = EnumAllyTypes.none;
      break;
    case EnumCardTypes.ability:
      newSubType = EnumAbilityTypes.none;
      break;
    case EnumCardTypes.item:
      newSubType = EnumItemTypes.artifact;
    case EnumCardTypes.location:
      newSubType = EnumLocationTypes.balor;
      break;
    }

    this.setState({ type: newType, subType: newSubType });
  },

  handleImageUrlChange: function () {
    var url = this.getStringValue('imageUrl')
    this.setState({ imageUrl: url })
  },

  onFlip: function () {
    this.setState({ flip: !this.state.flip })
  },

  // ------------------------
  // create / update the card

  handleSubmit: function (event) {
    var self = this;
    var card;

    event.preventDefault();

		// collect values from the form and the state
		card = {
			cardSet: this.state.cardSet,
			rankInCardSet: this.state.rankInCardSet,
			name: this.getStringValue('cardName'),
			type: this.state.type,
			subType: this.state.subType,
			faction: this.getIntValue('faction'),
			classes: this.refs.classes.getSelected(),
			castingCost: this.getIntValue('castingCost'),
      attack: this.getIntValue('attack'),
      defense: this.getIntValue('defense'),
      durability: this.getIntValue('durability'),
      unique: this.getBoolValue('unique'),
      restricted: this.getBoolValue('restricted'),
      rarity: this.getIntValue('rarity'),
      description: this.getStringValue('description'),
      opposingDescription: this.getStringValue('opposingDescription'),
      tags: []
		};

    if (card.durability === 0) {
      card.durability = null;
    }

    if (this.state.imageUrl) {
      card.imageUrl = this.state.imageUrl
    }

    // tags : all lower case, no duplicate
    this.refs.tags.getDOMNode().value.split(' ').forEach(function (item) {
      var tag = item.trim().toLowerCase();
      if (tag.length > 0 && card.tags.indexOf(tag) === -1) {
        card.tags.push(tag);
      }
    });

    // call the server side method to create or update the card
    if (this.props.card._id === null) {
      // create card
      Meteor.call('createCard', card, function (error, result) {
        var newState;

      	if (error) {
      		alert(error.reason);
      	}
        else {
    			// display the next card
          self.setState({ rankInCardSet: self.state.rankInCardSet + 1, flip: false });

          // reset the name and the tags
          self.setFocus('cardName');
          self.setStringValue('imageUrl');
          self.setStringValue('cardName', '');
          self.setStringValue('description', '');
          self.setStringValue('opposingDescription', '');
          self.setStringValue('tags', '');
      	}
      });
    }
    else {
      // update card
      Meteor.call('updateCard', this.props.card._id, card, function (error, result) {
        if (error) {
          alert(error.reason);
        }
        else {
          Router.go('card.view', { _id: self.props.card._id });
        }
      });
    }
  },

  // ------------------------

  render: function () {
    var Checkboxes = Crystal.React.Checkboxes;
    var card = this.props.card;
    var cardSet;
    var enumSubType = EnumCardTypes.getSubTypeEnum(this.state.type);
    var imageUrl = this.state.imageUrl || Crystal.imagePath(
      Crystal.cardRef(this.state.cardSet, this.state.rankInCardSet));
    var castingCostHtml = null;
    var subTypeHtml = null;
    var attackDefenseHtml = null;
    var uniqueHtml = null;
    var opposingDescriptionHtml = null;

    var imgStyle = {}
    if (this.state.flip) {
      imgStyle = {
        '-webkit-transform': 'rotate(180deg)',
            '-ms-transform': 'rotate(180deg)',
                'transform': 'rotate(180deg)'
      }
    }

    // find the card set of this card
    cardSet = CardSets.findOne(this.state.cardSet);
    if (! cardSet) {
      console.debug('EditCard.render() : cannot find the card set. state : ', this.state);
      return <span>NO CARD SET</span>;
    }

    // HTML for the type
    if (this.state.type !== EnumCardTypes.hero) {
      castingCostHtml = (
				<tr>
					<th>Casting cost</th>
					<td>
						<input ref='castingCost' type='number' min='0' max='9'
              defaultValue={card.castingCost} />
					</td>
				</tr>
      );
    }

    // HTML for the sub type
    if (enumSubType !== null) {
      subTypeHtml = (
				<tr>
					<th>Sub type</th>
					<td>
						<select ref='cardSubType' value={this.state.subType} onChange={this.handleChange}>
              {options(enumSubType.toArray())}
            </select>
					</td>
				</tr>
      );
    }

    // html for attack/defense/durability
    if (this.state.type === EnumCardTypes.ally) {
      attackDefenseHtml = this.makeAttackDefHtml('attack', 'defense');
    }

    if (this.state.type === EnumCardTypes.item) {
      if (this.state.subType === EnumItemTypes.artifact) {
        attackDefenseHtml = this.makeAttackDefHtml('durability');
      }
      else if (this.state.subType === EnumItemTypes.armor) {
        attackDefenseHtml = this.makeAttackDefHtml('durability', 'defense');
      }
      else if (this.state.subType === EnumItemTypes.weapon) {
        attackDefenseHtml = this.makeAttackDefHtml('attack', 'durability');
      }
    }

    // html for the 'unique' flag
    if (this.state.type !== EnumCardTypes.hero
      && this.state.type !== EnumCardTypes.location) {
      uniqueHtml = (
        <tr>
          <th></th>
          <td>
            <label>
              <input ref='unique' type='checkbox' defaultChecked={card.unique} />
              Unique
            </label>
          </td>
        </tr>
      );
    }

    // html for the opposing description
    if (this.state.type === EnumCardTypes.location) {
      opposingDescriptionHtml = (
        <tr>
          <th>Opposing<br/>Description</th>
          <td>
             <textarea ref='opposingDescription'
               defaultValue={card.opposingDescription} rows='5' cols='40' />
          </td>
        </tr>
      )
    }

    // return the HTML
    return (
    <form className='mo-container card-details-container' onSubmit={this.handleSubmit}>
      <section className='mo-content'>
        <h2>{ card._id ? 'Update card' : 'New card' }</h2>

        <table className='key-value-table card-details-table'>
    			<tbody>
    				<tr>
    					<th>Card set</th>
    					<td>
    						<select ref='cardSet' value={this.state.cardSet} onChange={this.handleChange}
                  disabled={card._id !== null}>
                  {options(CardSets.find({}, { sort: { rank: 1 } }))}
                </select>
    					</td>
    				</tr>

    				<tr>
    					<th>Rank in card set</th>
    					<td>
                <input ref='rankInCardSet' type='number'
                  min='1' max={cardSet.actualNumberOfCards}
                  value={this.state.rankInCardSet}
                  onChange={this.handleChange}
                  disabled={card._id !== null} /> / {cardSet.numberOfCards}
              </td>
    				</tr>

            <tr>
              <th>Image URL</th>
              <td>
                <input ref='imageUrl' type='text' style={{ width: '95%' }}
                  defaultValue={card.imageUrl} onChange={this.handleImageUrlChange} />
              </td>
            </tr>

    				<tr>
    					<th>Name</th>
    					<td>
                <input ref='cardName' type='text' style={{ width: '95%' }}
                  defaultValue={card.name} required />
              </td>
    				</tr>

    				<tr>
    					<th>Faction</th>
    					<td>
    						<select ref='faction' defaultValue={card.faction || EnumFactions.human}>
                  {options(EnumFactions.toArray())}
                </select>
    					</td>
    				</tr>

    				<tr>
    					<th>Type</th>
    					<td>
    						<select ref='cardType' value={this.state.type} onChange={this.handleChangeType}>
                  {options(EnumCardTypes.toArray())}
                </select>
    					</td>
    				</tr>

            {subTypeHtml}

    				<tr>
    					<th>Class restriction</th>
    					<td>
                <Checkboxes ref='classes' className='inline-ul'
                  items={EnumClasses.toArrayExcluding(EnumClasses.neutral)}
                  selected={card.classes || []} />
              </td>
    				</tr>

    				{castingCostHtml}
            {attackDefenseHtml}
            {uniqueHtml}

            <tr>
              <th></th>
              <td>
                <label>
                  <input ref='restricted' type='checkbox' defaultChecked={card.restricted} />
                  Restricted
                </label>
              </td>
            </tr>

            <tr>
              <th>Rarity</th>
              <td>
                <select ref='rarity' defaultValue={card.rarity}>
                  {options(EnumRarities.toArray())}
                </select>
              </td>
            </tr>

            <tr>
              <th>Description</th>
              <td>
                <textarea ref='description' defaultValue={card.description} rows='5' cols='40' />
              </td>
            </tr>

            {opposingDescriptionHtml}

    				<tr>
    					<th>Tags</th>
    					<td>
                <input ref='tags' type='text' style={{ width: '95%' }}
                  defaultValue={card.tags ? card.tags.join(' ') : ''} />
    					</td>
    				</tr>
          </tbody>

    			<tfoot>
    				<tr>
    					<td colSpan='2'>
                <a key='cancel' href={Router.path('card.view', { _id: card._id })}>Cancel</a>
                <input key='submit' type='submit' value={ card._id ? 'Update card' : 'Create card' } />
              </td>
    				</tr>
    			</tfoot>
        </table>
      </section>

      <img src={imageUrl} className='mo-image' style={ imgStyle } />
      <label style={{ display: this.state.type === EnumCardTypes.location ? 'inline' : 'none' }}>
        <input type='checkbox' value={this.state.flip} onChange={this.onFlip} />Flip
      </label>
    </form> );
  }
});

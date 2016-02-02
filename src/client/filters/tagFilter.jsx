// db.cards.distinct('tags').sort()
Crystal.validTags = [
  "ally",
	"buff",
	"twilight",
	"self",
	"attachment",
	"hand",
	"destroy",
	"graveyard",
	"item",
	"haste",
	"exile",
	"steadfast",
	"reducedmg",
	"deck",
	"draw",
	"electrical",
	"homunculus",
	"disabled",
	"heal",
	"hero",
	"templar",
	"damage",
	"resource",
	"ravager",
	"protector",
	"stealth",
	"wulven",
	"aldmor",
	"hex",
	"weapon",
	"kill",
	"ice",
	"undead",
	"fire",
	"se",
	"defender",
	"armor",
	"yari",
	"frozen",
	"ablaze",
	"trap",
	"poison",
	"ability",
	"hidden",
	"ambush",
	"arcane",
	"discard",
	"artifact",
	"summon",
	"bow",
	"support",
	"view",
	"meek",
	"seek"
];


Crystal.React.TagsDatalist = React.createClass({
  getDefaultProps: function () {
    return { id: 'tags-datalist' };
  },

  render: function () {
    var options = Crystal.validTags.map(function (tag) {
      return ( <option key={tag} value={tag} /> );
    });
    
    return (
      <datalist id={this.props.id}>
        {options}
      </datalist>
    );
  }
});


// React class to write tags
Crystal.React.TagFilter = React.createClass({
  
  getDefaultProps: function () {
    return {
      defaultValue: [],
      onChange: null // callback to know when the tags have changed
    };
  },
  
  getInitialState: function () {
    return { invalidTags: [] };
  },
  
  componentDidMount: function () {
    this.previousTags = null;
  },
  
  // ------------------------
  
  handleChange: function () {
    var self = this;
    var differFromPreviousTags = false;
    var validTags = Crystal.validTags;
    var tags = [];
    var invalidTags = [];
    
    self.refs.tags.getDOMNode().value.split(' ').forEach(function (item) {
      item = item.trim().toLowerCase();
      
      // no empty tag, no duplicate tag
      if (item.length > 0 && tags.indexOf(item) === -1) {
        // is it a valid tag ?
        if (validTags.indexOf(item) === -1) {
          // no, invalid tag
          invalidTags.push(item);
        }
        else {
          // yes, valid tag
          tags.push(item);
          if (self.previousTags !== null && self.previousTags.indexOf(item) === -1) {
            differFromPreviousTags = true;
          }
        }
      }
    });
    
    // we display the invalid tags
    self.setState({ invalidTags: invalidTags });
    
    // we only call the callback if the tag list has actually changed
    if (differFromPreviousTags === true
      || self.previousTags === null
      || self.previousTags.length !== tags.length)
    {
      self.previousTags = tags.slice(); // copy the array
      if (self.props.onChange !== null) {
        self.props.onChange(tags);
      }
    }
  },
  
  // ------------------------
  
  render: function () {
    return (
  		<div className='filter tag-filter'>
  			<span className='filter-title'>tags</span>
        <input ref='tags' type='search' list='tags-datalist'
          autofocus placeholder='draw fire graveyard' size='20'
          defaultValue={this.props.defaultValue.join(' ')} 
          onChange={this.handleChange} />
        <Crystal.React.TagsDatalist id='tags-datalist' />
        <span className='error'>{this.state.invalidTags.join(' ')}</span>
  		</div>
    );
  }
});

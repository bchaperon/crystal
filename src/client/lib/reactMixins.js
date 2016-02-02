/** @jsx React.DOM */

var savedStates = [];

Crystal.React.SaveStateMixin = {
  componentWillMount: function() {
    var state = savedStates[this.props.uniqueName];
    var restore = true;
    
    if (state) {
      state = EJSON.parse(state);
      
      if (this.shouldRestoreState) {
        restore = this.shouldRestoreState(state);
      }

      if (restore) {
        this.setState(state);
      }
    }
  },

  componentWillUnmount: function() {
    var uniqueName = this.props.uniqueName;
    if (uniqueName) {
      savedStates[uniqueName] = EJSON.stringify(this.state);
    }
  }
};

Crystal.React.FormMixin = {
  setFocus: function (refName) {
    if (this.refs[refName]) {
      return this.refs[refName].getDOMNode().focus();
    }
  },
  
  getStringValue: function (refName) {
    if (this.refs[refName]) {
      return this.refs[refName].getDOMNode().value.trim();
    }
    else {
      return null;
    }
  },

  getStringValueNoTrim: function (refName) {
    if (this.refs[refName]) {
      return this.refs[refName].getDOMNode().value;
    }
    else {
      return null;
    }
  },
  
  setStringValue: function (refName, value) {
    if (this.refs[refName]) {
      return this.refs[refName].getDOMNode().value = value;
    }
  },
  
  getIntValue: function (refName) {
    if (this.refs[refName]) {
      return parseInt(this.refs[refName].getDOMNode().value);
    }
    else {
      return null;
    }
  },
  
  getBoolValue: function (refName) {
    if (this.refs[refName]) {
      return this.refs[refName].getDOMNode().checked;
    }
    else {
      return null;
    }
  }
};

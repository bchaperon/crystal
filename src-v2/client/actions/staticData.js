// load the data (cards) from the server
function load (dispatch) {
  dispatch({
    type: 'staticData.loading'
  })
  
  Meteor.subscribe('allCards', () => {
    dispatch({
      type: 'staticData.ready'
    })
  })
}

export default {
  load
}

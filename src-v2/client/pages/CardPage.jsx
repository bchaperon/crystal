/** @jsx element */
import { element } from 'deku'
import { cards } from '/lib/collections'

function render ({ props, dispatch }) {
  let card = cards.findOne(props.id) || {}
  let imageUrl = 'http://www.shadowera.com/cards/' + card._id + '.jpg'
  
  return (
  <div>
    <h1>{card.name}</h1>
    <p>{card.description}</p>
    <p>{card.opposingDescription || ''}</p>
    <img src={imageUrl} alt={card.name} />
  </div> )
}

export default {
  render
}

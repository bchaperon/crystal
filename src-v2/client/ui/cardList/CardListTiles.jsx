/** @jsx element */
import { element } from 'deku'

function CardListTiles ({ props }) {
  const { cards } = props
  
  return (
  <ul>
  {cards.map(card => {
    const url = '/cards/' + card._id
    return (
    <li key={card._id}>
      <a href={url}>{card.name}</a>
    </li> )
  })}
  </ul>
  )
}

export default CardListTiles

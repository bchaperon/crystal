/** @jsx element */
import { element } from 'deku'

function CardListImages ({ props }) {
  const { cards, foil } = props
  
  return (
  <section>
    <p>CardListImages</p>
    <p>{cards.length} cards.</p>
    <p>{foil ? 'Foil' : ''}</p>
  </section> )
}

export default CardListImages

/** @jsx element */
import { element } from 'deku'

function CardListTable ({ props }) {
  const { cards } = props
  
  return (
  <table class='std-table card-list-table'>
    <thead>
      <tr>
        <th class='rarity-cell'></th>
        <th>Name</th>
		    <th>Faction</th>
		    <th>Type</th>
        <th>Cost</th>
        <th>Att/Def</th>
        <th class='description-cell'>Description</th>
        <th class='reference-cell'>Ref</th>
        <th class='tags-cell'>Tags</th>
	    </tr>
    </thead>
    <tbody>
      { cards.map(c => row(c)) }
    </tbody>
  </table> )
}

function row (card) {
  const c = card
  const url = '/cards/' + card._id

  return (
  <tr key={c._id} >
    <td class='rarity-cell'>{c.rarity}</td>
    <td><a href={url}>{c.name}</a></td>
    <td class='capitalize'>foo</td>
    <td class='capitalize'>bar</td>
    <td>{c.castingCost || ''}</td>
    <td>3 / 4</td>
    <td class='description-cell'>
      {c.description}
      {c.opposingDescription ? <hr/> : ''}
      {c.opposingDescription || ''}
    </td>
    <td class='reference-cell'><small>{c._id}</small></td>
    <td class='tags-cell tags'><small>{c.tags.join(' ')}</small></td>
  </tr> )
}

export default CardListTable

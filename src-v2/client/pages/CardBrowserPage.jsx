/** @jsx element */
import { element } from 'deku'
import { cards } from '/lib/collections'
import Filter from './Filter.jsx'
import { CardListTable, CardListTiles, CardListImages } from './cardList'

function getCardListComponent(displayAs, selectedCards) {
  switch (displayAs) {
  case 'vignettes':
    return (<CardListTiles cards={selectedCards} />)
  case 'images':
    return (<CardListImages cards={selectedCards} foil={false} />)
  case 'imagesFoil':
    return (<CardListImages cards={selectedCards} foil={true} />)
  case 'table':
  default:
    return (<CardListTable cards={selectedCards} />)
  }
}

function CardBrowserPage ({ props, dispatch }) {
  //let end, begin = new Date()
  const selector = { cardSet: 'lands' }
  const options = { limit: 50, reactive: false, order: { rank: 1 } }
  const selectedCards = cards.find(selector, options).fetch()
  const state = props.state.cardBrowser
  const { filters, displayAs } = state
  //end = new Date()
  //console.debug('Cards found in ' + (end - begin) + 'ms')

  return (
  <div>
    <h1>Card List</h1>

    <section class='filter-container'>
      <Filter name='Factions' id='faction' options={filters.faction} />
      <Filter name='Classes' id='classes' options={filters.classes} />
      <Filter name='Types' id='type' options={filters.type} />
      <Filter name='Cost' id='cost' options={[]} />
      <Filter name='Sets' id='cardSet' options={filters.cardSet} />
      <Filter name='Rarities' id='rarity' options={filters.rarity} />
      <div>Tags: {state.tags.join()}</div>
    </section>

    <section>
      <span>{selectedCards.length} cards</span>
      <span class='text-block'>
        <span>Display as </span>
        <select data-action='displayAs'>
          <option value='vignettes' selected={displayAs === 'vignettes'}>
            vignettes</option>
			    <option value='table' selected={displayAs === 'table'}>
            table</option>
			    <option value='images' selected={displayAs === 'images'}>
            images</option>
			    <option value='imagesFoil' selected={displayAs === 'imagesFoil'}>
            images (foil)</option>
		    </select>
      </span>
    </section>

    {getCardListComponent(state.displayAs, selectedCards)}
  </div> )
}

export default CardBrowserPage

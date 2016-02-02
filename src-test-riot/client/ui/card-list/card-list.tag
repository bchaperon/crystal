<card-list>
  <section>
    <span if={ cards }>{ cards.length } cards.</span>
    <span>Display as </span>
    <select onchange={ displayModeChanged }>
      <option value='tiles'  selected={ displayMode === 'tiles' }>Tiles</option>
      <option value='table'  selected={ displayMode === 'table' }>Table</option>
      <option value='images' selected={ displayMode === 'images' }>Images</option>
    </select>
    <span>Sort by </span>
    <select onchange={ sortChanged }>
      <option each={ o in Crystal.cards.sortOptions } value={ o.id }
              selected={ parent.sort === o.id }>{ o.name }
      </option>
    </select>
  </section>
  
  <card-list-tiles if={ displayMode === 'tiles' } cards={ cards } />
  <card-list-table if={ displayMode === 'table' } cards={ cards } />
  
  <script>
  
  
  </script>
</card-list>

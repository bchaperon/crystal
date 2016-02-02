<card-list-table>
  <table class='std-table card-list-table'>
    <thead>
      <tr>
        <th>Name</th>
        <th>Faction</th>
        <th>Type</th>
        <th>Cost</th>
        <th class='description-cell'>Description</th>
        <th class='reference-cell'>Ref</th>
        <th class='tags-cell'>Tags</th>
			</tr>
    </thead>
    <tbody>
      <tr each={ c in opts.cards }>
        <td><a href={ c.url() }>{ c.name }</a></td>
        <td>{ c.factionAndClassName() }</td>
        <td>{ c.typeName() }</td>
        <td>{ c.castingCost }</td>
        <td class='description-cell'>{ c.description }</td>
        <td class='reference-cell'><small>{ c._id }</small></td>
        <td class='tags-cell'><small>{ c.tags.join(' ') }</small></td>
      </tr>
    </tbody>
  </table>
</card-list-table>

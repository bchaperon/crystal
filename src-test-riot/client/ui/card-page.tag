<card-page>
  <loading if={ !ready } />

  <h1 if={ ready }>{ card.name }</h1>

  <table>
    <tr>
      <th>Casting Cost</th><td>{ card.castingCost }</td>
    </tr>
    <tr>
      <th>Description</th><td>{ card.description }</td>
    </tr>
  </table>

  <img src={ card.imageUrl() } alt={ card.name } />

  <script>
    autorun() {
      this.ready = Crystal.cards.ready()
      if (this.ready) {
        this.card = Crystal.cards.byId(opts.id)
      }
    }
    this.mixin('autorun')
  </script>
</card-page>

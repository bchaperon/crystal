<card-tile class='card-tile'>
  <a class='card-tile__name' href='/cards/{c._id}'>{ c.name }</a>
  <div class='card-tile__description'>{ c.description }</div>

  <script>
    this.c = opts.card
  </script>
</card-tile>

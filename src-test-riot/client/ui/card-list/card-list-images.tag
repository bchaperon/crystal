<card-list-images>
  <ul class='card-list-images'>
    <li each={ c in opts.cards } class='card-list-images__item'>
      <a href={ c.url() }>
        <img src={ c.imageUrl() } alt={ c.name } class='card-list-images__img' />
      </a>
    </li>
  </ul>
</card-list-images>

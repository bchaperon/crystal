<app-layout>
  <nav>
    <a href='/'>Crystal</a>
    <a href='/cards'>Card List</a>
    <a href='/decks/42/edit'>Deck Builder</a>
  </nav>
  <main id='main'></main>
  <scroll-to-top />

  <script>
    'use strict'
    var currentTag = null

    Dispatcher.on('router:changed', function (context) {
      var mountPoint = document.getElementById('main')

      // unmount the current tag to avoid memory leaks
      currentTag && currentTag.unmount()

      // mount the new tag
      mountPoint.innerHTML = '<' + context.tagName + ' />'
      currentTag = riot.mount(context.tagName, context.params)[0]
      window.scrollTo(0, 0)
    })
  </script>
</app-layout>

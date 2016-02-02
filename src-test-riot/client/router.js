'use strict'

function route(tagName) {
  return function (context) {
    Dispatcher.trigger('router:changed', {
      path: context.pathname,
      params: context.params,
      //query: context.querystring,
      tagName: tagName
    })
  }
}

page('/', route('home-page'))
page('/cards', route('card-browser-page'))
page('/cards/:id', route('card-page'))

page('/decks/create', route('create-deck-page'))
page('/decks/:id', route('deck-page'))
page('/decks/:id/edit', route('deck-builder-page'))

page('/login', route('login'))
page('/register', route('register'))

page('*', route('not-found-page'))

// export a function to start the router
Crystal.startRouter = function () {
  page.start()
}

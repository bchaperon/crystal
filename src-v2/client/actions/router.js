import page from 'page'

function init (dispatch) {
  const route = page => context => {
    dispatch({
      type: 'route',
      page: page,
      props: context.params
    })
    // where does that go?
    // window.scrollTo(0, 0)
  }

  page('/', route('HomePage'))
  page('/cards', route('CardBrowserPage'))
  page('/cards/:id', route('CardPage'))
  page('/test', route('TestPage'))
  page('*', route('NotFoundPage'))
}

function start () {
  page.start()
}

function stop () {
  page.stop()
}

export default {
  init, start, stop
}

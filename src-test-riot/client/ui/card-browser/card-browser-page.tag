<card-browser-page>
  <h1>Card List</h1>

  <section>
    <filter each={ f in filters } name={ f.name } options={ f.options }
            changed={ parent.filterChanged } />
  </section>

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

  <loading if={ !ready } />

  <script>
    this.ready = false
    this.cards = []
    this.displayMode = opts.displayMode || 'tiles'
    this.sort = opts.sort || 'ref'

    this.filtersModel = new Crystal.CardFiltersModel()
    this.filtersModel.init()

    var currentTag = null

    filterChanged(filterName, optionId, checked) {
      //console.debug('filter changed:', filterName, optionId, checked)
      this.filtersModel.updateFilter(filterName, optionId, checked)
      this.findCards()
      this.update()
    }

    displayModeChanged(event) {
      this.displayMode = event.target.value
      /*
      currentTag && currentTag.unmount(true)
      if (this.displayMode === 'tiles') {
        currentTag = riot.mount('#foo', 'card-list-tiles', { cards: this.cards })[0]
      }
      else if (this.displayMode === 'images') {
        currentTag = riot.mount('#foo', 'card-list-images', { cards: this.cards })[0]
      }
      */
    }

    sortChanged(event) {
      this.sort = event.target.value
      this.findCards()
    }

    findCards() {
      var start, end
      var mongoSelector = this.filtersModel.mongoSelector()
      //console.debug('mongoSelector', mongoSelector)
      if (this.ready) {
        start = Date.now()
        this.cards = Crystal.cards.find(mongoSelector, this.sort, 50)
        //this.cards = this.cards.slice(0, 50)
        end = Date.now()
        console.debug('find cards in ' + (end - start) + 'ms')
      }
    }

    autorun(computation) {
      console.log('autorun')
      this.ready = Crystal.cards.ready()
      if (this.ready) {
        this.findCards()
        computation.stop()
      }
    }
    this.mixin('autorun')

    var startUpdateDate
    this.on('update', function () {
      this.filters = this.filtersModel.filters()
      startUpdateTime = Date.now()
    })

    this.on('updated', function () {
      console.debug('tag updated in ' + (Date.now() - startUpdateTime) + 'ms')
    })
  </script>
</card-browser-page>

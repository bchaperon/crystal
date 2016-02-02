<create-deck-page>
  <h1>Create a new deck</h1>

  <p>Name your deck, then choose your hero.</p>

  <label>
    Deck Name
    <input autofocus placeholder='My great new deck' />
  </label>

  <section>
    <filter each={ f in filters } name={ f.name } options={ f.options }
            changed={ parent.filterChanged } />
  </section>

  <card-list />
  
  <script>
    this.filters = []

  </script>
</create-deck-page>

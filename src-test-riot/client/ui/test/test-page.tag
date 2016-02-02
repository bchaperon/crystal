<test-page>

  <log-stuff foo={42} bar={ bar } />

  <input type='button' onclick={incrementBar} >Up!</input>

  <script>
    this.bar = { value: 5 }

    console.debug('init test-page')
    
    incrementBar() {
      var val = this.bar.value + 1
      this.bar = { value: val }
    }


    this.on('mount', function () {
      console.debug('mount test-page')
    })

    this.on('update', function () {
      console.debug('update test-page')
    })

    this.on('unmount', function () {
      console.debug('unmount test-page')
    })
  </script>
</test-page>

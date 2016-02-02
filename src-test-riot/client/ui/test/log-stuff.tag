<log-stuff>

  <div>opts.foo { opts.foo }</div>
  <div>opts.bar { opts.bar.value }</div>
  <div>static bar { staticBar.value }</div>

  <script>
    'use strict'

    this.staticBar = opts.bar

    console.debug('init log-stuff with opts ', opts)

    this.on('mount', function () {
      console.debug('mount log-stuff with opts ', opts)
    })

    this.on('update', function () {
      console.debug('update log-stuff with opts ', opts)
    })

    this.on('unmount', function () {
      console.debug('unmount log-stuff with opts ', opts)
    })

  </script>
</log-stuff>

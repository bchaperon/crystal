<filter class='filter'>
  <span class='filter__name'>{opts.name}</span>
  <ul class='filter__list'>
    <li each={ o in opts.options }>
      <label>
        <input type='checkbox' checked={ o.checked } onclick={ parent.toggle }>
        { o.name }
      </label>
    </li>
  </ul>

  <script>
    toggle(event) {
      if (opts.changed) {
        opts.changed(opts.name, event.item.o._id, event.target.checked)
      }
    }
  </script>
</filter>

<scroll-to-top>
  <a href='#' class='scroll-to-top { scroll-to-top--hidden: hide }'
     onclick={ scrollToTop } >&#9650;
  </a>

  <script>
    var tag = this
    tag.hide = true

    scrollToTop() {
      window.scrollTo(0, 0)
    }

    function onScroll() {
      var distance = window.pageYOffset || document.documentElement.scrollTop
      var newHide = (distance < 250)
      if (newHide !== tag.hide) {
        tag.hide = newHide
        tag.update()
      }
    }

    this.on('mount', function () {
      window.addEventListener('scroll', onScroll, false)
    })

    this.on('unmount', function () {
      window.removeEventListener('scroll', onScroll, false)
    })
  </script>
</scroll-to-top>

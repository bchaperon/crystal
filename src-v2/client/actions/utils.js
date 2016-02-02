
function dataAttr (event, attributeName) {
  return event.target.getAttribute('data-' + attributeName)
}

export default {
  dataAttr
}
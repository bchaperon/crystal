/** @jsx element */
import { element } from 'deku'
import pages from './pages'
import Navigation from './ui/Navigation.jsx'


function getComponent (route) {
  switch (route.page) {
  case 'HomePage':
    return pages.HomePage
  case 'CardBrowserPage':
    return pages.CardBrowserPage
  case 'CardPage':
    return pages.CardPage
  case 'TestPage':
    return pages.TestPage
  default:
    return pages.NotFoundPage
  }
}

function Layout ({ props }) {
  const state = props.state
  const route = state.route
  const component = getComponent(route)
  
  return (
  <div>
    <Navigation />
    {element(component, { ...route.props, state })}
    <footer>
    </footer>
  </div> )
}

export default Layout

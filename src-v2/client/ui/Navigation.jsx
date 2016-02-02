/** @jsx element */
import { element } from 'deku'

function Navigation ({ props }) {
  return (
  <nav>
    <ul>
     <li><a href='/'>Home</a></li>
     <li><a href='/cards'>Card List</a></li>
     <li><a href='/cards/se042'>Keldor</a></li>
     <li><a href='/cards/ll183'>Anmor: Garina Road</a></li>
    </ul>
  </nav> )
}

export default Navigation

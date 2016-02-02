/** @jsx element */
import { element } from 'deku'

function Counter ({ props }) {
  return (
  <section>
    <span>id: {props.id}</span>
    <button data-id={props.id} class='increment'>Increment</button>
    <button data-id={props.id} class='decrement'>Decrement</button>
    <button data-id={props.id} class='reset'>Reset</button>
    <span>Value: {props.value}.</span>
  </section> )
}

export default Counter

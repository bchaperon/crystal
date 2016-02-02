/** @jsx element */
import { element } from 'deku'

function Filter ({ props }) {
  const changed = option => event => {
    if (props.onChanged) {
      props.onChanged(props.name, option.id, event.target.checked)
    }
  }

  return (
  <div class='filter'>
    <span>{props.name}</span>
    {props.options.map(o => {
      return (
      <label>
        <input type='checkbox'
          data-filter-id={props.id} data-option-id={o.id} checked={o.checked} />
        {o.name}
      </label> )
    })}
  </div> )
}

export default Filter

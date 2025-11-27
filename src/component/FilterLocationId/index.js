import './index.css'

const FilterLocationId = props => {
  const {locationDetails, onAddLocationId} = props
  const {locationId, label} = locationDetails

  const onClickAddLocationId = () => {
    onAddLocationId(locationId)
  }
  return (
    <li className="list-item">
      <input
        className="check-box-input"
        type="checkbox"
        id={locationId}
        onClick={onClickAddLocationId}
        role="checkbox"
      />
      <label className="input-label" htmlFor={locationId}>
        {label}
      </label>
    </li>
  )
}

export default FilterLocationId

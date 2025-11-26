import './index.css'

const FilterEmploymentID = props => {
  const {employmentDetails, onAddEmploymentId} = props
  const {employmentTypeId, label} = employmentDetails

  const onClickAddEmploymentId = () => {
    onAddEmploymentId(employmentTypeId)
  }
  return (
    <li className="list-item">
      <input
        className="check-box-input"
        type="checkbox"
        id={employmentTypeId}
        onClick={onClickAddEmploymentId}
        role="checkbox"
      />
      <label className="input-label" htmlFor={employmentTypeId}>
        {label}
      </label>
    </li>
  )
}

export default FilterEmploymentID

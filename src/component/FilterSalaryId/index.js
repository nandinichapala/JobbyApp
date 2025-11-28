import './index.css'

const FilterSalaryId = props => {
  const {salaryDetails, onAddSalaryRange} = props
  const {salaryRangeId, label} = salaryDetails
  const onClickSalaryRange = () => {
    onAddSalaryRange(salaryRangeId)
  }

  return (
    <li className="list-item">
      <input
        className="radio-input"
        type="radio"
        id={salaryRangeId}
        onChange={onClickSalaryRange}
      />
      <label className="input-label" htmlFor={salaryRangeId}>
        {label}
      </label>
    </li>
  )
}

export default FilterSalaryId

import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import ProfileDetails from '../ProfileDetails'
import FilterEmploymentID from '../FilterEmploymentID'
import FilterSalaryId from '../FilterSalaryId'
import JobCard from '../JobCard'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import {BsSearch} from 'react-icons/bs'

import './index.css'

const apisStatusList = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobsSection extends Component {
  state = {
    apisStatus: apisStatusList.initial,
    employmentTypeList: [],
    salaryRange: 0,
    searchInput: '',
    jobsList: [],
  }

  componentDidMount() {
    this.getJobsDetails()
  }

  getJobsDetails = async () => {
    this.setState({apisStatus: apisStatusList.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {employmentTypeList, salaryRange, searchInput} = this.state

    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeList.join()}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedJobsList = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        packagePerAnnum: each.package_per_annum,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        apisStatus: apisStatusList.success,
        jobsList: updatedJobsList,
      })
    } else {
      this.setState({apisStatus: apisStatusList.failure})
    }
  }

  onAddEmploymentId = id => {
    const {employmentTypeList} = this.state
    let updatedTypeList = employmentTypeList
    if (employmentTypeList.includes(id)) {
      updatedTypeList = employmentTypeList.filter(each => each !== id)
    } else {
      updatedTypeList = [...updatedTypeList, id]
    }

    this.setState({employmentTypeList: updatedTypeList}, this.getJobsDetails)
  }

  filterEmployment = () => (
    <div className="filter-employment-container">
      <h1 className="employment-heading">Type of Employment</h1>
      <ul className="employment-list-container">
        {employmentTypesList.map(eachEmploymentIdDetails => (
          <FilterEmploymentID
            key={eachEmploymentIdDetails.employmentTypeId}
            employmentDetails={eachEmploymentIdDetails}
            onAddEmploymentId={this.onAddEmploymentId}
          />
        ))}
      </ul>
    </div>
  )

  onAddSalaryRange = id => {
    const {salaryRange} = this.state
    if (salaryRange === id) {
      this.setState({salaryRange: 0}, this.getJobsDetails)
    } else {
      this.setState({salaryRange: id}, this.getJobsDetails)
    }
  }

  filterSalary = () => (
    <div className="filter-salary-container">
      <h1 className="salary-heading">Salary Range</h1>
      <ul className="salary-list-container">
        {salaryRangesList.map(eachSalaryIdDetails => (
          <FilterSalaryId
            key={eachSalaryIdDetails.salaryRangeId}
            salaryDetails={eachSalaryIdDetails}
            onAddSalaryRange={this.onAddSalaryRange}
          />
        ))}
      </ul>
    </div>
  )

  renderJobsDetails = () => {
    const {apisStatus} = this.state
    switch (apisStatus) {
      case apisStatusList.inProgress:
        return this.renderInprogressView()
      case apisStatusList.success:
        return this.renderSuccessView()
      case apisStatusList.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  onClickFailureRetry = () => {
    this.setState({apisStatus: apisStatusList.inProgress}, this.getJobsDetails)
  }

  renderInprogressView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {jobsList} = this.state
    if (jobsList.length === 0) {
      return (
        <div className="No-jobs-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="no-jobs-image"
          />
          <h1 className="no-jobs-heading">No Jobs Found</h1>
          <p className="no-jobs-description">
            We could not find any jobs. Try other filters.
          </p>
        </div>
      )
    }
    return (
      <>
        <ul className="jobs-list-container">
          {jobsList.map(eachjobCardDetails => (
            <JobCard
              key={eachjobCardDetails.id}
              jobCardDetails={eachjobCardDetails}
            />
          ))}
        </ul>
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="failure-retry-btn"
        type="button"
        onClick={this.onClickFailureRetry}
      >
        Retry
      </button>
    </div>
  )

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onFilterSearch = event => {
    if (event.key === 'Enter') {
      this.getJobsDetails()
    }
  }

  onClickSearchBtn = () => {
    this.getJobsDetails()
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="jobs-section-container">
        <div className="profile-filter-container">
          <ProfileDetails />
          <hr className="horizontal-line" />
          {this.filterEmployment()}
          <hr className="horizontal-line" />
          {this.filterSalary()}
        </div>
        <div className="search-job-card-container">
          <div className="search-bar-container">
            <input
              type="search"
              className="search-input"
              placeholder="Search"
              onChange={this.onChangeSearchInput}
              value={searchInput}
              onKeyDown={this.onFilterSearch}
            />
            <button
              type="button"
              data-testid="searchButton"
              className="search-icon-btn"
              onClick={this.onClickSearchBtn}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          {this.renderJobsDetails()}
        </div>
      </div>
    )
  }
}
export default JobsSection

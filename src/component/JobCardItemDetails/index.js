import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {
  BsStarFill,
  BsGeoAlt,
  BsBriefcaseFill,
  BsBoxArrowUpRight,
} from 'react-icons/bs'

import Header from '../Header'

import './index.css'

const apisStatusList = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobCardItemDetails extends Component {
  state = {
    apisStatus: apisStatusList.initial,
    jobDetails: {},
    skills: [],
    lifeAtCompany: {},
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apisStatus: apisStatusList.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedJobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }

      const updatedSkills = data.job_details.skills.map(each => ({
        imageUrl: each.image_url,
        name: each.name,
      }))

      const updatedSimilarJobs = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        id: each.id,
        location: each.location,
        title: each.title,
        rating: each.rating,
      }))

      const updatedLifeAtCompany = {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }

      this.setState({
        apisStatus: apisStatusList.success,
        jobDetails: updatedJobDetails,
        skills: updatedSkills,
        lifeAtCompany: updatedLifeAtCompany,
        similarJobs: updatedSimilarJobs,
      })
    } else {
      this.setState({apisStatus: apisStatusList.failure})
    }
  }

  renderCardItemDetails = () => {
    const {apisStatus} = this.state
    switch (apisStatus) {
      case apisStatusList.inProgress:
        return this.renderLodingView()
      case apisStatusList.success:
        return this.renderSuccessView()
      case apisStatusList.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderLodingView = () => (
    <div className="card-Item-container">
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  renderSuccessView = () => {
    const {jobDetails, skills, lifeAtCompany, similarJobs} = this.state
    console.log(similarJobs)
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails
    const {description, imageUrl} = lifeAtCompany

    return (
      <div className="card-item-success-container">
        <div className="card-container">
          <div className="card-item-logo-heading-rating-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="card-item-company-logo"
            />
            <div className="card-item-heading-rating-container">
              <h1 className="card-item-job-role">{title}</h1>
              <div className="card-item-rating-icon-container">
                <BsStarFill className="card-item-star-icon" />
                <p className="card-item-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="card-item-location-employmentType-salary-container">
            <div className="card-item-location-employmentType-container">
              <div className="card-item-icon-container">
                <BsGeoAlt className="card-item-icon" />
                <p className="card-item-icons-text">{location}</p>
              </div>
              <div className="card-item-icon-container">
                <BsBriefcaseFill className="card-item-icon" />
                <p className="card-item-icons-text">{employmentType}</p>
              </div>
            </div>
            <p className="card-item-salary">{packagePerAnnum}</p>
          </div>
          <hr className="card-item-horizontal-line" />
          <div className="description-heading-anchor-container">
            <h1 className="card-item-description-heading">Description</h1>
            <a className="visit-link-container" href={companyWebsiteUrl}>
              <button type="button" className="visit-btn">
                Visit
              </button>
              <BsBoxArrowUpRight className="visit-icon" />
            </a>
          </div>
          <p className="card-item-description">{jobDescription}</p>
          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-list-container">
            {skills.map((each, index) => (
              <li
                className="skills-item-container"
                key={`${each.name}-${index}`}
              >
                <img
                  src={each.imageUrl}
                  className="skills-image"
                  alt={each.name}
                />
                <p className="skills-text">{each.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="life-at-company-heading">Life at Company</h1>
          <div className="lifeatCompany-desc-container">
            <p className="lifeatCompany-desc">{description}</p>
            <img
              src={imageUrl}
              className="lifeatCompany-image"
              alt="life at company"
              role="img"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list-container">
          {similarJobs.map(each => (
            <li className="similarJob-item-container" key={each.id}>
              <div className="similarJob-logo-heading-rating-container">
                <img
                  src={each.companyLogoUrl}
                  alt="similar job company logo"
                  className="similarJob-company-logo"
                />
                <div className="similarJob-heading-rating-container">
                  <h1 className="similarJob-job-role">{each.title}</h1>
                  <div className="similarJob-rating-icon-container">
                    <BsStarFill className="similarJob-star-icon" />
                    <p className="similarJob-rating">{each.rating}</p>
                  </div>
                </div>
              </div>
              <h1 className="similarJob-desc-heading">Description</h1>
              <p className="similarJob-desc">{each.jobDescription}</p>

              <div className="similarJob-location-employmentType-container">
                <div className="similarJob-icon-container">
                  <BsGeoAlt className="similarJob-icon" />
                  <p className="similarJob-icons-text">{each.location}</p>
                </div>
                <div className="similarJob-icon-container">
                  <BsBriefcaseFill className="similarJob-icon" />
                  <p className="similarJob-icons-text">{each.employmentType}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  onClickRetryBtn = () => {
    this.getJobDetails()
  }

  renderFailureView = () => (
    <div className="Card-details-failure-container">
      <img
        className="Card-details-failure-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="Card-details-failure-heading">
        Oops! Something Went Wrong
      </h1>
      <p className="Card-details-failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="Card-details-failure-btn"
        onClick={this.onClickRetryBtn}
      >
        Retry
      </button>
    </div>
  )

  render() {
    return (
      <div className="card-items-details-container">
        <Header />
        {this.renderCardItemDetails()}
      </div>
    )
  }
}
export default JobCardItemDetails

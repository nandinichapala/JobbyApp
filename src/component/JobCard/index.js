import {Link} from 'react-router-dom'
import {BsStarFill, BsGeoAlt, BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobCard = props => {
  const {jobCardDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    packagePerAnnum,
    location,
    rating,
    title,
  } = jobCardDetails

  return (
    <Link to={`/jobs/${id}`} className="link-btn">
      <li className="card-list-item">
        <div className="logo-heading-rating-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="heading-rating-container">
            <h1 className="job-role">{title}</h1>
            <div className="rating-icon-container">
              <BsStarFill className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-employmentType-salary-container">
          <div className="location-employmentType-container">
            <div className="icon-container">
              <BsGeoAlt className="icon" />
              <p className="icons-text">{location}</p>
            </div>
            <div className="icon-container">
              <BsBriefcaseFill className="icon" />
              <p className="icons-text">{employmentType}</p>
            </div>
          </div>
          <h1 className="salary">{packagePerAnnum}</h1>
        </div>
        <hr className="horizontal-line" />
        <h1 className="description-heading">Description</h1>
        <p className="description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard

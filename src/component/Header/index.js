import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const {history} = props
  const clickOnLogoutBtn = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <>
      <nav className="nav-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="nav-logo-image"
          />
        </Link>

        <ul className="list-container">
          <Link to="/" className="nav-link">
            <li className="list-item">Home</li>
          </Link>
          <Link to="/jobs" className="nav-link">
            <li className="list-item">Jobs</li>
          </Link>

          <li className="list-btn-item">
            <button className="logout-btn" onClick={clickOnLogoutBtn}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default withRouter(Header)

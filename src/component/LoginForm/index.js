import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errMsg: '',
  }

  renderSuccessView = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  renderFailureView = errMsg => {
    this.setState(prevState => ({
      showErrorMsg: !prevState.showErrorMsg,
      errMsg,
    }))
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.renderSuccessView(data.jwt_token)
      console.log(data.jwt_token)
    } else {
      this.renderFailureView(data.error_msg)
      console.log('failure')
    }
  }

  onChangeUsernameInput = event => {
    this.setState({username: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, showErrorMsg, errMsg} = this.state
    return (
      <div className="login-main-container">
        <div className="login-box-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form onSubmit={this.onSubmitForm} className="form-container">
            <label htmlFor="username" className="label-element">
              USERNAME
            </label>
            <input
              type="text"
              className="input-element"
              id="username"
              placeholder="Username"
              onChange={this.onChangeUsernameInput}
              value={username}
            />
            <label htmlFor="password" className="label-element">
              PASSWORD
            </label>
            <input
              type="password"
              className="input-element"
              id="password"
              placeholder="Password"
              onChange={this.onChangePasswordInput}
              value={password}
            />
            {showErrorMsg ? <p className="err-msg">*{errMsg}</p> : null}
            <button className="login-btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm

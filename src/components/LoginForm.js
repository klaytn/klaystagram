import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isValidPrivateKey } from 'utils/crypto'
import Input from 'components/Input'
import Button from 'components/Button'

import * as authActions from 'redux/actions/auth'

import './LoginForm.scss'

class LoginForm extends Component {
  state = {
    privateKey: '',
    warningMessage: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleLogin = () => {
    const { login } = this.props
    const { privateKey } = this.state
    isValidPrivateKey(privateKey)
      ? login(privateKey)
      : this.setState({ warningMessage: '* Invalid Private Key' })
  }

  render() {
    const { warningMessage } = this.state
    return (
      <div className="LoginForm">
        <Input
          className="LoginForm__input"
          type="password"
          name="privateKey"
          label="Login with Private Key"
          placeholder="0x2c4078447..."
          onChange={this.handleChange}
          err={warningMessage}
        />
        <Button
          className="LoginForm__button"
          title="Log in"
          onClick={this.handleLogin}
        />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (privateKey) => dispatch(authActions.login(privateKey)),
})

export default connect(null, mapDispatchToProps)(LoginForm)

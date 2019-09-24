import React, { Component } from 'react'
import caver from 'klaytn/caver'
import Input from 'components/Input'
import Button from 'components/Button'

import './SignupForm.scss'

class SignupForm extends Component {
  state = {
    privateKey: null,
  }

  generatePrivateKey = () => {
    const { privateKey } = caver.klay.accounts.create()
    this.setState({ privateKey })
  }

  render() {
    const { privateKey } = this.state

    return (
      <div className="SignupForm">
        <Input
          className="SignupForm__input"
          placeholder="Generate Private Key to Sign up"
          value={privateKey || ''}
          label="Private key"
          readOnly
        />
        <Button
          className="SignupForm__button"
          title="Generate Private key"
          onClick={this.generatePrivateKey}
        />
      </div>
    )
  }
}

export default SignupForm

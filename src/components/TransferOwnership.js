import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as photoActions from 'redux/actions/photos'
import ui from 'utils/ui'
import { isValidAddress } from 'utils/crypto'
import Input from 'components/Input'
import Button from 'components/Button'

import './TransferOwnership.scss'

class TransferOwnership extends Component {
  state = {
    to: null,
    warningMessage: '',
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { id, transferOwnership } = this.props
    const { to } = this.state

    if (!isValidAddress(to)) {
      return this.setState({
        warningMessage: '* Invalid wallet address',
      })
    }
    transferOwnership(id, to)
    ui.hideModal()
  }

  render() {
    const { id, issueDate, currentOwner } = this.props
    return (
      <div className="TransferOwnership">
        <h3 className="TransferOwnership__copyright">Copyright. {id}</h3>
        <p className="TransferOwnership__issueDate">Issue Date  {issueDate}</p>
        <form className="TransferOwnership__form" onSubmit={this.handleSubmit}>
          <Input
            className="TransferOwnership__from"
            name="from"
            label="Current Owner"
            value={currentOwner}
            readOnly
          />
          <Input
            className="TransferOwnership__to"
            name="to"
            label="New Owner"
            onChange={this.handleInputChange}
            placeholder="Transfer Ownership to..."
            err={this.state.warningMessage}
            required
          />
          <Button
            type="submit"
            title="Transfer Ownership"
          />
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  transferOwnership: (id, to) => dispatch(photoActions.transferOwnership(id, to)),
})

export default connect(null, mapDispatchToProps)(TransferOwnership)

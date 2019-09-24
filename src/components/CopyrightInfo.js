import React, { Component } from 'react'
import cx from 'classnames'
import { KLAYTN_SCOPE } from 'constants/url'
import IconButton from 'components/IconButton'
import LinkNewTab from 'components/LinkNewTab'

import './CopyrightInfo.scss'

class CopyrightInfo extends Component {
  state = {
    showInfo: false,
  }

  toggleShowInfo = () => this.setState({
    showInfo: !this.state.showInfo,
  })

  render() {
    const { showInfo } = this.state
    const {
      className,
      id,
      issueDate,
      originalOwner,
      currentOwner,
    } = this.props

    return (
      <div className={cx('CopyrightInfo', className)}>
        <IconButton
          className="CopyrightInfo__button"
          icon="icon-copyright.png"
          alt="Show copyright info"
          onClick={this.toggleShowInfo}
        />
        {showInfo && (
          <InfoTooltip
            id={id}
            issueDate={issueDate}
            originalOwner={originalOwner}
            currentOwner={currentOwner}
          />
        )}
      </div>
    )
  }
}


const InfoTooltip = ({
  id,
  issueDate,
  originalOwner,
  currentOwner,
}) => (
  <div className="CopyrightInfo__info">
    <header className="CopyrightInfo__header">
      <h5 className="CopyrightInfo__id">Copyright.{id}</h5>
      <span className="CopyrightInfo__registerDate">{issueDate}</span>
    </header>
    <p className="CopyrightInfo__owner">
      Original Owner
      <LinkNewTab
        className="CopyrightInfo__ownerLink"
        link={`${KLAYTN_SCOPE}transactions?account=${originalOwner}`}
        title={originalOwner}
      />
    </p>
    <p className="CopyrightInfo__owner">
      Current Owner
      <LinkNewTab
        className="CopyrightInfo__ownerLink"
        link={`${KLAYTN_SCOPE}transactions?account=${currentOwner}`}
        title={currentOwner}
      />
    </p>
  </div>
)

export default CopyrightInfo

import React from 'react'
import LinkNewTab from 'components/LinkNewTab'
import { KLAYTN_SCOPE } from 'constants/url'

import './PhotoHeader.scss'

const PhotoHeader = ({ currentOwner, location }) => (
  <header className="PhotoHeader">
    <LinkNewTab
      className="PhotoHeader__owner"
      link={`${KLAYTN_SCOPE}transactions?account=${currentOwner}`}
      title={currentOwner}
    />
    <p className="PhotoHeader__location">{location}</p>
  </header>
)

export default PhotoHeader

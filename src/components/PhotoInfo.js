import React, { Fragment } from 'react'

import './PhotoInfo.scss'

const PhotoInfo = ({ name, caption, issueDate }) => (
  <Fragment>
    <h2 className="PhotoInfo__name">{name}</h2>
    <p className="PhotoInfo__caption">{caption}</p>
    <span className="PhotoInfo__issueDate">{issueDate}</span>
  </Fragment>
)

export default PhotoInfo

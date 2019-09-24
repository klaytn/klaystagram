import React from 'react'
import cx from 'classnames'

import './IconButton.scss'

const IconButton = ({
  className,
  icon,
  alt,
  onClick,
}) => (
  <button
    className={cx('IconButton', className)}
    onClick={onClick}
  >
    <img src={`images/${icon}`} alt={alt} />
  </button>
)

export default IconButton

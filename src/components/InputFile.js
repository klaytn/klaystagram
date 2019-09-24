import React from 'react'
import cx from 'classnames'

import './InputFile.scss'

const Input = ({
  className,
  name,
  value,
  label,
  fileName,
  onChange,
  required,
  accept,
  err,
}) => (
  <div className={cx('InputFile', className, { 'InputFile--err': err })}>
    <p className="InputFile__label">{label}</p>
    <label className="InputFile__button" htmlFor="upload">
      Search
    </label>
    <input
      className="InputFile__input"
      id="upload"
      type="file"
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      accept={accept}
    />
    <p
      className={cx('InputFile__fileName', {
        'InputFile__fileName--empty': !fileName,
      })
      }
    >
      {fileName || 'No photo'}
    </p>
    {
      err &&
      <p className="InputFile__err">{err}</p>
    }
  </div>
)

export default Input

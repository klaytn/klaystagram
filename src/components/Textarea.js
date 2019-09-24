import React from 'react'
import cx from 'classnames'

import './Textarea.scss'

const Textarea = ({
  className,
  name,
  label,
  value,
  onChange,
  placeholder,
  err,
}) => (
  <div className={cx('Textarea', className)}>
    {
      label &&
      <label className="Textarea__label" htmlFor={name}>
        {label}
      </label>
    }
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={cx(
        'Textarea__textarea',
        { 'Textarea__textarea--err': err },
      )}
      autoComplete="off"
    />
    {
      err &&
      <p className="Textarea__err">{err}</p>
    }
  </div>
)

export default Textarea

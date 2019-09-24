import React from 'react'
import ui from 'utils/ui'
import UploadPhoto from 'components/UploadPhoto'

import './UploadButton.scss'

const UploadButton = () => (
  <button
    className="UploadButton"
    onClick={() => ui.showModal({
      header: 'Upload Photo',
      content: <UploadPhoto />,
    })}
  >
    Upload photo
  </button>
)

export default UploadButton

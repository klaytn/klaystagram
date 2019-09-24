import React from 'react'
import { connect } from 'react-redux'
import ui from 'utils/ui'

import './Modal.scss'

const Modal = ({ modal }) => (
  modal && (
    <div className="Modal__wrapper">
      <div className="Modal" style={modal.width && { width: `${modal.width}` }}>
        <h2 className="Modal__header">{modal.header}</h2>
        <div className="Modal__body">{modal.content}</div>
        <button className="Modal__close" onClick={ui.hideModal}>Close modal</button>
      </div>
    </div>
  )
)


const mapStateToProps = (state) => ({
  modal: state.ui.modal,
})

export default connect(mapStateToProps)(Modal)

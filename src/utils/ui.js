import {
  showModal,
  hideModal,
  showToast,
  hideToast,
} from 'redux/actions/ui'
import store from 'redux/store'

export const ui = {
  showModal: (content) => store.dispatch(showModal(content)),
  hideModal: () => store.dispatch(hideModal()),
  showToast: (toast) => store.dispatch(showToast(toast)),
  hideToast: () => store.dispatch(hideToast()),
}

export default ui

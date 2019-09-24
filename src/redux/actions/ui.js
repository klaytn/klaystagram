import {
  SHOW_MODAL,
  HIDE_MODAL,
  SHOW_TOAST,
  HIDE_TOAST,
} from './actionTypes'

export const showModal = (content) => {
  return ({
    type: SHOW_MODAL,
    payload: {
      content,
    },
  })
}

export const hideModal = () => ({
  type: HIDE_MODAL,
})


export const showToast = (toast) => ({
  type: SHOW_TOAST,
  payload: {
    toast,
  },
})

export const hideToast = () => ({
  type: HIDE_TOAST,
})

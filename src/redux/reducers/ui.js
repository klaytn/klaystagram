import {
  SHOW_MODAL,
  HIDE_MODAL,
  SHOW_TOAST,
  HIDE_TOAST,
} from 'redux/actions/actionTypes'

const initialState = {
  modal: null,
  toast: null,
}

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        modal: action.payload.content,
      }
    case HIDE_MODAL:
      return {
        ...state,
        modal: null,
      }
    case SHOW_TOAST:
      return {
        ...state,
        toast: action.payload.toast,
      }
    case HIDE_TOAST:
      return {
        ...state,
        toast: null,
      }
    default:
      return state
  }
}

export default uiReducer

import {
  LOGIN,
  LOGOUT,
  INTEGRATE_WALLET,
  REMOVE_WALLET,
} from 'redux/actions/actionTypes'

const initialState = {
  isLoggedIn: !!sessionStorage.getItem('walletInstance'),
  privateKey: null,
  address: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
      }
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      }
    case INTEGRATE_WALLET:
      return {
        ...state,
        privateKey: action.payload.privateKey,
        address: action.payload.address,
      }
    case REMOVE_WALLET:
      return {
        ...state,
        privateKey: null,
        address: null,
      }
    default:
      return state
  }
}

export default authReducer

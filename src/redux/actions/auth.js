import caver from 'klaytn/caver'
import {
  LOGIN,
  LOGOUT,
  INTEGRATE_WALLET,
  REMOVE_WALLET,
} from './actionTypes'

export const integrateWallet = (privateKey) => (dispatch) => {
  const walletInstance = caver.klay.accounts.privateKeyToAccount(privateKey)
  caver.klay.accounts.wallet.add(walletInstance)
  sessionStorage.setItem('walletInstance', JSON.stringify(walletInstance))
  return dispatch({
    type: INTEGRATE_WALLET,
    payload: {
      privateKey,
      address: walletInstance.address,
    },
  })
}

export const removeWallet = () => (dispatch) => {
  caver.klay.accounts.wallet.clear()
  sessionStorage.removeItem('walletInstance')
  return dispatch({
    type: REMOVE_WALLET,
  })
}

export const login = (privateKey) => (dispatch) => {
  dispatch(integrateWallet(privateKey))
  return dispatch({
    type: LOGIN,
  })
}

export const logout = () => (dispatch) => {
  dispatch(removeWallet())
  return dispatch({
    type: LOGOUT,
  })
}


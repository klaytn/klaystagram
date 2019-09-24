import KlaystagramContract from 'klaytn/KlaystagramContract'
import { getWallet } from 'utils/crypto'
import ui from 'utils/ui'
import { feedParser } from 'utils/misc'
import { SET_FEED } from './actionTypes'


// Action creators

const setFeed = (feed) => ({
  type: SET_FEED,
  payload: { feed },
})

const updateFeed = (tokenId) => (dispatch, getState) => {
  KlaystagramContract.methods.getPhoto(tokenId).call()
    .then((newPhoto) => {
      const { photos: { feed } } = getState()
      const newFeed = [feedParser(newPhoto), ...feed]
      dispatch(setFeed(newFeed))
    })
}

const updateOwnerAddress = (tokenId, to) => (dispatch, getState) => {
  const { photos: { feed } } = getState()
  const newFeed = feed.map((photo) => {
    if (photo[ID] !== tokenId) return photo
    photo[OWNER_HISTORY].push(to)
    return photo
  })
  dispatch(setFeed(newFeed))
}


// API functions

export const getFeed = () => (dispatch) => {
  KlaystagramContract.methods.getTotalPhotoCount().call()
    .then((totalPhotoCount) => {
      if (!totalPhotoCount) return []
      const feed = []
      for (let i = totalPhotoCount; i > 0; i--) {
        const photo = KlaystagramContract.methods.getPhoto(i).call()
        feed.push(photo)
      }
      return Promise.all(feed)
    })
    .then((feed) => dispatch(setFeed(feedParser(feed))))
}

export const uploadPhoto = (
  file,
  fileName,
  location,
  caption
) => (dispatch) => {
  const reader = new window.FileReader()
  reader.readAsArrayBuffer(file)
  reader.onloadend = () => {
    const buffer = Buffer.from(reader.result)
    /**
     * Add prefix `0x` to hexString
     * to recognize hexString as bytes by contract
     */
    const hexString = "0x" + buffer.toString('hex')
    KlaystagramContract.methods.uploadPhoto(hexString, fileName, location, caption).send({
      from: getWallet().address,
      gas: '200000000',
    })
      .once('transactionHash', (txHash) => {
        ui.showToast({
          status: 'pending',
          message: `Sending a transaction... (uploadPhoto)`,
          txHash,
        })
      })
      .once('receipt', (receipt) => {
        ui.showToast({
          status: receipt.status ? 'success' : 'fail',
          message: `Received receipt! It means your transaction is
          in klaytn block (#${receipt.blockNumber}) (uploadPhoto)`,
          link: receipt.transactionHash,
        })
        const tokenId = receipt.events.PhotoUploaded.returnValues[0]
        dispatch(updateFeed(tokenId))
      })
      .once('error', (error) => {
        ui.showToast({
          status: 'error',
          message: error.toString(),
        })
      })
  }
}

export const transferOwnership = (tokenId, to) => (dispatch) => {
  KlaystagramContract.methods.transferOwnership(tokenId, to).send({
    from: getWallet().address,
    gas: '20000000',
  })
    .once('transactionHash', (txHash) => {
      ui.showToast({
        status: 'pending',
        message: `Sending a transaction... (transferOwnership)`,
        txHash,
      })
    })
    .once('receipt', (receipt) => {
      ui.showToast({
        status: receipt.status ? 'success' : 'fail',
        message: `Received receipt! It means your transaction is
          in klaytn block (#${receipt.blockNumber}) (transferOwnership)`,
        link: receipt.transactionHash,
      })
      dispatch(updateOwnerAddress(tokenId, to))
    })
    .once('error', (error) => {
      ui.showToast({
        status: 'error',
        message: error.toString(),
      })
    })
}

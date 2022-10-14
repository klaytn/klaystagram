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

      // Update new feed to store
      dispatch(setFeed(newFeed))
    })
}

const updateOwnerAddress = (tokenId, to) => (dispatch, getState) => {
  const { photos: { feed } } = getState()
  const newFeed = feed.map((photo) => {
    if (photo['id'] !== tokenId) return photo
    photo['ownerHistory'] = [...photo['ownerHistory'], to]
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
  // 1. Convert photo file as a hex string to load on transaction
  const reader = new window.FileReader()
  reader.readAsArrayBuffer(file)
  reader.onloadend = () => {
    const buffer = Buffer.from(reader.result)

    // Add prefix `0x` to hexString to recognize hexString as bytes by contract
    const hexString = "0x" + buffer.toString('hex')

    // 2. Invoke the contract method: uploadPhoto
    // Send transaction with photo file(hexString) and descriptions
    try{
      KlaystagramContract.methods.uploadPhoto(hexString, fileName, location, caption).send({
        from: getWallet().address,
        gas: '200000000',
      }, (error, txHash) => {
        if (error) throw error;

        // 3. After sending the transaction,
        // show progress along the transaction lifecycle using `Toast` component.
        ui.showToast({
          status: 'pending',
          message: `Sending a transaction... (uploadPhoto)`,
          txHash,
        })
      })
        .then((receipt) => {
          ui.showToast({
            status: receipt.status ? 'success' : 'fail',
            message: `Received receipt! It means your transaction is
            in klaytn block (#${receipt.blockNumber}) (uploadPhoto)`,
            link: receipt.transactionHash,
          })

          // 4. If the transaction successfully gets into a block,
          // call `updateFeed` function to add the new photo into the feed page.
          if(receipt.status) {
            const tokenId = receipt.events.PhotoUploaded.returnValues[0]
            dispatch(updateFeed(tokenId))
          }
        })
    } catch (error) {
      ui.showToast({
        status: 'error',
        message: error.toString(),
      })
    }
  }
}

export const transferOwnership = (tokenId, to) => (dispatch) => {
  // 1. Invoke the contract method: transferOwnership
  try{
    KlaystagramContract.methods.transferOwnership(tokenId, to).send({
      
      // 2. Set transaction options
      from: getWallet().address,
      gas: '20000000',
    }, (error, txHash) => {
      if (error) throw error;

      // 3. After sending the transaction,
      // show progress along the transaction lifecycle using `Toast` component.
      ui.showToast({
        status: 'pending',
        message: `Sending a transaction... (transferOwnership)`,
        txHash,
      })
    })
      .then((receipt) => {
        ui.showToast({
          status: receipt.status ? 'success' : 'fail',
          message: `Received receipt! It means your transaction is
            in klaytn block (#${receipt.blockNumber}) (transferOwnership)`,
          link: receipt.transactionHash,
        })

        // 4. If the transaction successfully gets into a block,
        // call `updateOwnerAddress` function to update new owner's address into the feed page.
        dispatch(updateOwnerAddress(tokenId, to))
      })
  } catch (error) {
    ui.showToast({
      status: 'error',
      message: error.toString(),
    })
  }
}

import caver from 'klaytn/caver'

/**
 * 1. Create contract instance
 * ex:) new caver.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)
 * You can call contract method through this instance.
 * Now you can access the instance by `this.countContract` variable.
 */

const KlaystagramContract = DEPLOYED_ABI
  && DEPLOYED_ADDRESS
  && new caver.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)

export default KlaystagramContract

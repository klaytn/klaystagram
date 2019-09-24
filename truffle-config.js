const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");

/**
 * truffle network variables
 * for deploying contract to klaytn network.
 */
const NETWORK_ID = '1001'

/**
 * URL: URL for the remote node you will be using
 * PRIVATE_KEY: Private key of the account that pays for the transaction (Change it to your own private key)
 */
const URL = 'https://api.baobab.klaytn.net:8651'

// Paste your `Private key` that has enough KLAY to truffle.js
const PRIVATE_KEY = '0x3de0c90ce7e440f19eff6439390c29389f611725422b79c95f9f48c856b58277'

module.exports = {
  networks: {
    baobab: {
      provider: () => new HDWalletProvider(PRIVATE_KEY, URL),
      network_id: NETWORK_ID,
      gas: '8500000',
      gasPrice: null,
    },
  },

  // Specify the version of compiler, we use 0.5.6
  compilers: {
    solc: {
      version: '0.5.6',
    },
  },
}

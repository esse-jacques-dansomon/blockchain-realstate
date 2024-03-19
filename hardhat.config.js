require('@nomiclabs/hardhat-waffle')
require('dotenv').config()

const privateKey = process.env.PRIVATE_KEY

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    testnet: {
      url: 'https://rpc-mumbai.maticvigil.com',
      accounts: [privateKey]
    },
    mainnet: {
      url: 'https://polygon-rpc.com',
      accounts: [privateKey]
    },
    localhost: {
      url: ' http://127.0.0.1:8545',
      accounts: [privateKey]
    }
  },
  solidity: '0.8.4'
}

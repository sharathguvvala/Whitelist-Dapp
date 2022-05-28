require('@nomiclabs/hardhat-waffle')

require('dotenv').config({path:".env"})

const Infura_API_Key = process.env.Infura_API_Key
const Ropsten_Private_Key = process.env.Ropsten_Private_Key

module.exports = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: Infura_API_Key,
      accounts: [Ropsten_Private_Key]
    }
  }
}
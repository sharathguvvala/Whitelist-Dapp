require('@nomiclabs/hardhat-waffle')

require('dotenv').config()

const Infura_API_Key = process.env.Infura_API_Key
const Goerli_Private_Key = process.env.Goerli_Private_Key

module.exports = {
  solidity: "0.8.4",
  networks: {
    goerli: {
      url: Infura_API_Key,
      accounts: [Goerli_Private_Key]
    }
  }
}
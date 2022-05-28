const { ethers } = require('hardhat')

async function main() {
    const whitelistContarct = await ethers.getContractFactory("Whitelist")

    const deloyedWhitelistContract = await whitelistContarct.deploy(3)

    await deloyedWhitelistContract.deployed()

    console.log(`Whitelist Contract Address ${deloyedWhitelistContract.address}`)
}

main().then(()=>{process.exit(0)}).catch((error)=>{
    console.error(error)
    process.exit(1)
})

//smart contract address 0x2c3df319A8A2B2b343c18db43EEEdb563efDB170
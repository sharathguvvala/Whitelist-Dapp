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

//smart contract address 0x626950595e5bf87e2a4857de36d939262098c259
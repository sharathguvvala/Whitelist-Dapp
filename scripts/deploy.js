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

//smart contract address 0xb2BC3957b2B93491B26D7D175Cb1FA38556Dc976
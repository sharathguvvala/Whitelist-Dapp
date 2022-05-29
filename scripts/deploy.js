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

//smart contract address 0x2379400670D3d207dbf3dA5d347D03471dAcC890
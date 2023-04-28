const verify = require("../utils/verify")

const { ethers } = require("hardhat")

const developmentChains = ["localhost", "hardhat"]

const deployLand = async function (hre) {
    // @ts-ignore
    const { getNamedAccounts, deployments, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    log("----------------------------------------------------")
    log("Deploying LandNFT and waiting for confirmations...")
    const land = await deploy("LandNFT", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: developmentChains.includes(network.name) ? 1 : 5,
    })
    log(`LandNFT at ${land.address}`)
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(land.address, [])
    }
}

module.exports = deployLand
deployLand.tags = ["all", "land"]

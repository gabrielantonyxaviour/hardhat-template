const {verify} = require("../utils/verify")

const { ethers } = require("hardhat")

const developmentChains = ["localhost", "hardhat"]

const deployRiot = async function (hre) {
    // @ts-ignore
    const { getNamedAccounts, deployments, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    log("----------------------------------------------------")
    log("Deploying TheRiotProtocol and waiting for confirmations...")
    const riot = await deploy("TheRiotProtocol", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: developmentChains.includes(network.name) ? 1 : 5,
    })
    log(`LandNFT at ${riot.address}`)
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(riot.address, [])
    }
}

module.exports = deployRiot
deployRiot.tags = ["all", "riot"]

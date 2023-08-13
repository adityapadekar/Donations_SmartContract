const { verify } = require("../utils/verify");
require("dotenv").config();
const { network } = require("hardhat");

const developmentChains = ["hardhat", "localhost"];

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    log("\n=================================================================");
    log("Deploying Contract........\n");

    const donations = await deploy("Donations", {
        from: deployer,
        log: true,
        args: [],
        waitConfirmations: network.config.blockConfirmations || 1,
    });
    log("\nContract Deployed!...");
    log("=================================================================\n");

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(donations.address, []);
    }
    log("=================================================================");
};

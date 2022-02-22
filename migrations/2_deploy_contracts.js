const MyToken = artifacts.require("./MyToken");
const MyTokenSale = artifacts.require("./MyTokenSale")
const KycContract = artifacts.require("KYC");
require("dotenv").config({path:"../.env"});

module.exports = async function(deployer) {
    let addr = await web3.eth.getAccounts();
    await deployer.deploy(MyToken, process.env.INITIIAL_TOKENS);
    await deployer.deploy(KycContract);
    await deployer.deploy(MyTokenSale, 1, addr[0], MyToken.address, KycContract.address);
    let instance = await MyToken.deployed();
    instance.transfer(MyTokenSale.address, process.env.INITIIAL_TOKENS);
};

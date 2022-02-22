var MyToken = artifacts.require("./MyToken.sol");
var MyTokenSale = artifacts.require("./MyTokenSale.sol");
require("dotenv").config({path:"../.env"});

module.exports = async function(deployer) {
    let addr = await web3.eth.getAccounts();
    await deployer.deploy(MyToken, process.env.INITIIAL_TOKENS);
    await deployer.deploy(MyTokenSale, 1, addr[0], MyToken.address);
    let instance = await MyToken.deployed();
    instance.transfer(MyTokenSale.address, process.env.INITIIAL_TOKENS);
};

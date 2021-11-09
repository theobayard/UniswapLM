import { expect } from "chai";
import { ethers } from "hardhat";

/**
 * This is like a tester for the testing suite/base infrastructure. 
 * It should always work and has no relevance to the actual bot, 
 * but if these aren't working something is wrong with the testing suite or hardhat.
 */
describe("Greeter", function () {
    it("Should return the new greeting once it's changed", async function () {
        const Greeter = await ethers.getContractFactory("Greeter");
        const greeter = await Greeter.deploy("Hello, world!");
        await greeter.deployed();
    
        expect(await greeter.greet()).to.equal("Hello, world!");
    
        const setGreetingTx = await greeter.setGreeting("Hola, mundo!");
    
        // wait until the transaction is mined
        await setGreetingTx.wait();
    
        expect(await greeter.greet()).to.equal("Hola, mundo!");
    });
});
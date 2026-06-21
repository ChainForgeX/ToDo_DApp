const {ethers} = require("hardhat");

async function main(){
    const ToDo = await ethers.getContractFactory("ToDo");

    const todo = await ToDo.deploy();

    await todo.waitForDeployment();

    console.log("ToDo deployed at:", await todo.getAddress());
}

main().catch((error) =>{
    console.log(error);
    process.exitCode = 1;
})
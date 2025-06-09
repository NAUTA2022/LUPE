const { ethers, upgrades } = require("hardhat");

async function main() {
  const Contract = await ethers.getContractFactory("ICOLupeUpgradeable");

  const instance = await upgrades.deployProxy(
    Contract,
    ["0x6a0db1AB91c42611A587d06aF8167da7D85B6496"], // argumentos del initialize
    {
      initializer: "initialize",
      kind: "uups"
    }
  );

  await instance.waitForDeployment();

  const proxyAddress = await instance.getAddress();
  console.log("Proxy deployed to:", proxyAddress);

  const implAddress = await upgrades.erc1967.getImplementationAddress(proxyAddress);
  console.log("Implementation (logic) contract address:", implAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

const { run } = require("hardhat");

async function main() {
  const implementationAddress = "0xf2F95c5460EAa08e0C7107f21b6DDed1c827D8F1"; // Reemplaza con la dirección de la implementación lógica
  const constructorArguments = []; // Para UUPS, usualmente está vacío

  console.log("Verifying implementation at address:", implementationAddress);

  try {
    await run("verify:verify", {
      address: implementationAddress,
      constructorArguments: constructorArguments,
    });

    console.log("Implementation contract verified successfully!");
  } catch (error) {
    console.error("Error verifying contract:", error.message || error);
    process.exitCode = 1;
  }
}

main();

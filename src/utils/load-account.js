import StellarSdk from "stellar-sdk";
const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

const loadAccount = async publicKey => {
  // Cargamos la cuenta a través del sdk de Stellar
  const account = await server.loadAccount(publicKey);

  return account;
};

export { loadAccount };

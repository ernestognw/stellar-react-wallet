// utils/check-balance.js
const StellarSdk = require("stellar-sdk");
const dotenv = require("dotenv");

dotenv.config();
const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

const checkBalance = async () => {
  // Cargamos la cuenta a través del sdk de Stellar
  const account = await server.loadAccount(process.env.PUBLIC_KEY);

  console.log("Balances for account: " + process.env.PUBLIC_KEY);

  // Checamos cada una de las cuentas y su balance
  account.balances.forEach(balance => {
    console.log("Type:", balance.asset_type, ", Balance:", balance.balance);
  });
};

checkBalance();

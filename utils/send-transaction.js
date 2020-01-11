// utils/send-transaction.js
const StellarSdk = require("stellar-sdk");
const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");
const dotenv = require("dotenv");

dotenv.config();

const sourceKeys = StellarSdk.Keypair.fromSecret(process.env.SECRET);
const destination = "GA2C5RFPE6GCKMY3US5PAB6UZLKIGSPIUKSLRB6Q723BM2OARMDUYEJ5";

const sendTransaction = async () => {
  try {
    // Revisamos que la cuenta exista para evitar errores
    // y cobros innecesarios de comisiones
    await server.loadAccount(destination);
    const sourceAccount = await server.loadAccount(sourceKeys.publicKey());

    // Armamos la transacción
    const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: StellarSdk.Networks.TESTNET
    })
      .addOperation(
        StellarSdk.Operation.payment({
          destination: destination,
          // Dado que Stellar permite transacciones en diferentes
          // tipos de cambio, debes especificar la moneda en la que enviarás
          // El tipo "native" se refiere a Lumens (XLM)
          asset: StellarSdk.Asset.native(),
          amount: "10"
        })
      )
      // Espera un máximo de tres minutos por la transacción
      .setTimeout(180)
      .build();

    // Firmamos la transacción para autenticar nuestra identidad
    transaction.sign(sourceKeys);
    // Finalmente la enviamos a Stellar
    const result = await server.submitTransaction(transaction);
    console.log("Success! Results:", result);
  } catch (err) {
    console.error("An error has occurred", err);
  }
};

sendTransaction();

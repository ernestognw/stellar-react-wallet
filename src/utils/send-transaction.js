import StellarSdk from "stellar-sdk";

const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

const sendTransaction = async (secret, destination, amount) => {
  try {
    const sourceKeys = StellarSdk.Keypair.fromSecret(secret);
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
          destination,
          // Dado que Stellar permite transacciones en diferentes
          // tipos de cambio, debes especificar la moneda en la que enviarás
          // El tipo "native" se refiere a Lumens (XLM)
          asset: StellarSdk.Asset.native(),
          amount
        })
      )
      // Espera un máximo de tres minutos por la transacción
      .setTimeout(180)
      .build();

    // Firmamos la transacción para autenticar nuestra identidad
    transaction.sign(sourceKeys);
    // Finalmente la enviamos a Stellar
    const result = await server.submitTransaction(transaction);

    return result;
  } catch (err) {
    console.error("An error has occurred", err);
  }
};

export { sendTransaction };

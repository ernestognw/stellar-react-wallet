// utils/create-pair.js
import StellarSdk from "stellar-sdk";

const pair = StellarSdk.Keypair.random();

const createTestAccount = () => {
  // Creamos nuestro par de llaves
  const secret = pair.secret();
  const publicKey = pair.publicKey();

  return {
    secret,
    publicKey
  };
};

const activeTestAccount = async publicKey => {
  // Solicitamos la activación de nuestra cuenta al friendbot de stellar
  const response = await fetch(
    `https://friendbot.stellar.org?addr=${publicKey}`
  );

  // Mostramos el resultado de la RESPUESTA
  const responseJSON = await response.json();

  return responseJSON;
};

export { createTestAccount, activeTestAccount };

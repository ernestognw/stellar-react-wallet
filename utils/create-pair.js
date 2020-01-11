// utils/create-pair.js
const StellarSdk = require("stellar-sdk");
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

const pair = StellarSdk.Keypair.random();

const createTestAccount = async () => {
  // Creamos nuestro par de llaves
  const secret = pair.secret();
  const publicKey = pair.publicKey();

  try {
    // Solicitamos la activación de nuestra cuenta al friendbot de stellar
    const response = await fetch(
      `https://friendbot.stellar.org?addr=${publicKey}`
    );

    // Mostramos el resultado de la RESPU
    const responseJSON = await response.json();
    console.log(responseJSON);

    // Escribimos un archivo secreto con nuestras llaves
    fs.writeFileSync(
      path.join(__dirname, "../", ".env"),
      `SECRET=${secret}\nPUBLIC_KEY=${publicKey}`
    );

    console.log("SUCCESS! You have a new account :)");
  } catch (error) {
    console.error("An error has occurred", error);
  }
};

createTestAccount();

import React, { useState } from "react";
import CopyKey from "./components/copy-key";
import Start from "./components/start";
import Main from "./components/main";

const Wallet = () => {
  // Valores de las llaves
  const [secret, setSecret] = useState(localStorage.secret);
  const [publicKey, setPublicKey] = useState(localStorage.publicKey);

  // Flag para checar si ya copiaron la llave privada
  const [isKeyCopied, setKeyCopied] = useState(localStorage.keyCopied);

  // Funcion para salir de la cuenta
  const resetAccount = () => {
    // Al salir de la cuenta, removemos todos los datos de sesión
    localStorage.removeItem("keyCopied");
    localStorage.removeItem("publicKey");
    localStorage.removeItem("secret");
    // Con esto, mandamos al usuario a la vista de inicio
    setKeyCopied(undefined);
    setSecret(undefined);
    setPublicKey(undefined);
  };

  // Al recién iniciar la aplicación, es necesario pedirle que cree una cuenta
  if (!secret || !publicKey) {
    // En la vista de inicio, vamos a necesitar acceso a los setters
    // para avanzar a las siguientes vistas
    return (
      <Start
        setSecret={setSecret}
        setPublicKey={setPublicKey}
        setKeyCopied={setKeyCopied}
      />
    );
    // Una vez creada, hay que pedirle que guarde su llave privada para que pueda entrar en el futuro
  } else if (!isKeyCopied) {
    // En la vista de copy, necesitamos el secret para mostrarlo al usuario,
    // además, utilizaremos la llave pública para fondear la cuenta.
    // El setter será para avanzar a la siguiente vista
    // y el reset para regrear al inicio
    return (
      <CopyKey
        secret={secret}
        publicKey={publicKey}
        setKeyCopied={setKeyCopied}
        resetAccount={resetAccount}
      />
    );
  }

  // Si ya tiene sus llaves, y ya copió el secret, iniciamos el wallet
  return (
    <Main publicKey={publicKey} secret={secret} resetAccount={resetAccount} />
  );
};

export default Wallet;

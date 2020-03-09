import React, { useEffect, useState } from "react";
import { loadAccount } from "../../../../utils/load-account";
import AccountData from "./components/account-data";
import SendTransaction from "./components/send-transaction";
import BalanceChecker from "./components/balance-checker";
import { Box, Button, Stack, Text, Divider } from "@chakra-ui/core";

const Main = ({ publicKey, secret, resetAccount }) => {
  // Estado de la aplicación con la cuenta
  const [account, setAccount] = useState(undefined);

  // Función para actualizar la wallet
  const updateAccount = () => {
    const getData = async () => {
      const account = await loadAccount(publicKey);
      setAccount(account);
    };

    getData();
  };

  // Use effect se ejecuta sólo cuando abre la vista principal
  // Por lo que se usará para cargar la cuenta al inicio
  useEffect(updateAccount, [publicKey]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      width="100%"
      maxWidth="48rem"
      borderWidth="1px"
      p={6}
    >
      <Stack width="100%" maxWidth="48rem" justifyContent="center">
        <AccountData account={account} publicKey={publicKey} />
        <SendTransaction secret={secret} updateAccount={updateAccount} />
        <BalanceChecker />
        <Divider my={10} />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Text textAlign="center" fontSize="xl">
            Cuenta
          </Text>
          <Button onClick={resetAccount} variant="outline" variantColor="red">
            Cerrar cuenta
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default Main;

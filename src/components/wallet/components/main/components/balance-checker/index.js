import React, { useState } from "react";
import {
  Text,
  InputGroup,
  Input,
  Button,
  InputLeftAddon,
  InputRightAddon,
  Divider
} from "@chakra-ui/core";
import { loadAccount } from "../../../../../../utils/load-account";

const BalanceChecker = () => {
  // Cuenta que es consultada
  const [checkedAccount, setCheckedAccount] = useState(undefined);
  const [accountToCheck, setAccountToCheck] = useState("");

  // Función para checar el balance
  const checkBalance = async () => {
    const account = await loadAccount(accountToCheck);
    setCheckedAccount(account);
  };

  return (
    <>
      <Divider my={10} />
      <Text textAlign="center" fontSize="xl">
        Checador de balances
      </Text>
      <InputGroup mt={2}>
        <Input
          onChange={({ target: { value } }) => setAccountToCheck(value)}
          value={accountToCheck}
          placeholder="Cuenta a checar"
          roundRight="0"
        />
        <Button onClick={checkBalance} variantColor="green">
          Checar balance
        </Button>
      </InputGroup>
      {checkedAccount?.balances.map(({ balance, asset_type }, index) => (
        <InputGroup mt={2} key={index}>
          <InputLeftAddon>Número: {index}</InputLeftAddon>
          <Input roundedLeft="0" roundRight="0" readOnly value={balance} />
          <InputRightAddon>XLM</InputRightAddon>
          <InputRightAddon>Tipo: {asset_type}</InputRightAddon>
        </InputGroup>
      ))}
    </>
  );
};

export default BalanceChecker;

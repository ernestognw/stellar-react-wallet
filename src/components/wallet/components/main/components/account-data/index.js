import React from "react";
import {
  Text,
  InputGroup,
  Input,
  InputRightElement,
  InputLeftAddon,
  InputRightAddon,
  Button,
  useClipboard
} from "@chakra-ui/core";

const AccountData = ({ publicKey, account }) => {
  // Esta función nos ayudará a copiar usando el portapapeles
  // Checar los docs en https://chakra-ui.com/useclipboard
  const { onCopy, hasCopied } = useClipboard(publicKey);

  return (
    <>
      <Text textAlign="center" fontSize="xl">
        Llave pública
      </Text>
      <InputGroup mt={2}>
        <Input readOnly pr="4.5rem" value={publicKey} />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={onCopy}>
            {hasCopied ? "Copiado" : "Copiar"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <Text mt={10} textAlign="center" fontSize="xl">
        Balance de la cuenta
      </Text>
      {account?.balances.map(({ balance, asset_type }, index) => (
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

export default AccountData;

import React from "react";
import { Box } from "@chakra-ui/core";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import Wallet from "./components/wallet";

const App = () => {
  return (
    <ThemeProvider>
      <CSSReset />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        padding={30}
      >
        <Wallet />
      </Box>
    </ThemeProvider>
  );
};

export default App;

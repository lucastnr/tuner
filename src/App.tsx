import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import Tuner from "./components/Tuner";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
});

export const App = () => (
  <ChakraProvider theme={theme}>
    <ColorModeSwitcher justifySelf="flex-end" />
    <Tuner />
  </ChakraProvider>
);

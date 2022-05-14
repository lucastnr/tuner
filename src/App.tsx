import React from "react";
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import Tuner from "./components/Tuner";

export const App = () => (
  <ChakraProvider theme={theme}>
    <ColorModeSwitcher justifySelf="flex-end" />
    <Tuner />
  </ChakraProvider>
);

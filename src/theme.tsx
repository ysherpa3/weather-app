/**
 * Custom Chakra-UI theme
 */

import { extendTheme } from "@chakra-ui/react";

const fonts = {
  heading: `'Raleway', sans-serif`,
  body: `'Open Sans', sans-serif`,
};

const theme = extendTheme({
  semanticTokens: {
    colors: {
      primary: {
        default: "#00796b",
        _dark: "#4db6ac",
      },
      bg: {
        default: "#fafafa",
        _dark: "#171717",
      },
      icon: {
        default: "rgba(0, 0, 0, 0.64)",
        _dark: "rgba(255, 255, 255, 0.64)",
      },
    },
  },
  colors: {
    black: "#171717",
    white: "#fafafa",
  },
  fonts,
});

export default theme;

import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/open-sans";
import "@fontsource/raleway/300.css";
import "instantsearch.css/themes/satellite-min.css";
import type { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { DefaultSeo } from "next-seo";

import SEO from "../../next-seo.config";
import { UnitContext } from "../contexts/UnitContext";
import theme from "../theme";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// Return current unit
const getCurrentUnit = () => {
  if (typeof window !== "undefined") {
    const unit = localStorage.getItem("unit");
    return unit ? JSON.parse(unit) : "imperial";
  }
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const [unit, setUnit] = useState(getCurrentUnit);

  useEffect(() => {
    localStorage.setItem("unit", JSON.stringify(unit));
  }, [unit]);

  return (
    <ChakraProvider theme={theme}>
      <UnitContext.Provider value={{ unit, setUnit }}>
        <DefaultSeo {...SEO} />
        {getLayout(<Component {...pageProps} />)}
      </UnitContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;

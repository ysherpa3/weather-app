/**
 * Base page layout
 */

import { Center, IconButton, Text, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";

import { Container } from "./Container";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Main } from "./Main";
import { UnitToggleSwitch } from "./UnitToggleSwitch";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  const [hasMounted, setHasMounted] = useState(false);

  const router = useRouter();
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <Container minH="100vh">
      <Header>
        <IconButton
          icon={<AiOutlineHome />}
          aria-label="Go to homepage"
          onClick={() => router.push("/")}
          borderRadius="50%"
          size="sm"
          variant={isDark ? "outline" : "solid"}
        />
        <UnitToggleSwitch />
        <DarkModeSwitch />
      </Header>
      <Main>
        <Center h="100%">{children}</Center>
      </Main>
      <Footer>
        <Text fontSize="xs" color="text">
          &copy; {new Date().getFullYear()} Yogesh Sherpa
        </Text>
      </Footer>
    </Container>
  );
};

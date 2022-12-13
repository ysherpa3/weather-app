import { Stack, StackProps } from "@chakra-ui/react";

export const Main = (props: StackProps) => (
  <Stack
    flexGrow="1"
    spacing="1.5rem"
    w="100%"
    maxW="96rem"
    p={["1rem", "2rem", "3rem"]}
    {...props}
  />
);

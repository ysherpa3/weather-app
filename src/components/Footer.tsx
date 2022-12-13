import { Flex, FlexProps } from "@chakra-ui/react";

export const Footer = (props: FlexProps) => (
  <Flex
    as="footer"
    maxW="96rem"
    w="100%"
    justify="center"
    py="2rem"
    mt="auto"
    {...props}
  />
);

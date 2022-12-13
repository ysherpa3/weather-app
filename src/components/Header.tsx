import { Flex, FlexProps } from "@chakra-ui/react";

export const Header = (props: FlexProps) => (
  <Flex
    as="header"
    justify="space-between"
    align="center"
    maxW="96rem"
    w="100%"
    p="1rem"
    {...props}
  />
);

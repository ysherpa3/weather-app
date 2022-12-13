/**
 * Custom algolia Hits component
 */

import { Box, Flex, Stack, StackDivider, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  Highlight,
  useHits,
  UseHitsProps,
} from "react-instantsearch-hooks-web";

type HitProps = {
  id: string;
  name: string;
  state: string;
  country: string;
  coord: {
    lon: string;
    lat: string;
  };
};

export const CustomHits = (props: UseHitsProps<HitProps>) => {
  const { hits } = useHits(props);
  const router = useRouter();
  const { colorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <Stack
      divider={<StackDivider borderColor="gray.400" />}
      bgColor={isDark ? "gray.800" : "gray.100"}
      boxShadow="base"
      borderRadius="sm"
      fontSize="sm"
      spacing="0"
    >
      {hits.map((hit) => (
        <Box
          key={hit.id}
          p="1rem"
          onClick={() =>
            router.push({
              pathname: `/city/${hit.name.replace(/\s/g, "")}`,
              query: {
                lat: hit.coord.lat,
                lon: hit.coord.lon,
                state: hit.state,
                country: hit.country,
              },
            })
          }
          cursor="pointer"
          _hover={{ bgColor: isDark ? "gray.700" : "gray.300" }}
        >
          <Stack>
            <Highlight hit={hit} attribute="name" />
            {hit?.state ? (
              <Flex>
                <Highlight hit={hit} attribute="state" />,{" "}
                <Highlight hit={hit} attribute="country" />
              </Flex>
            ) : (
              <Highlight hit={hit} attribute="country" />
            )}
          </Stack>
        </Box>
      ))}
    </Stack>
  );
};

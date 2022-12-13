/**
 * Returns message if no results are found
 */

import { Flex, Text } from "@chakra-ui/react";
import { useInstantSearch } from "react-instantsearch-hooks-web";

export const NoResultsBoundary = ({ children, fallback }) => {
  const { results } = useInstantSearch();

  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <>
        {fallback}
        <div hidden>{children}</div>
      </>
    );
  }

  return children;
};

export const NoResults = () => {
  const { indexUiState } = useInstantSearch();

  return (
    <Flex justify="center" py="1rem">
      <Text fontSize="sm">
        No results for <q>{indexUiState.query}</q>
      </Text>
    </Flex>
  );
};

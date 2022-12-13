/**
 * Return fallback component if search query is empty
 */

import { useInstantSearch } from "react-instantsearch-hooks-web";

export const EmptyQueryBoundary = ({ children, fallback }) => {
  const { indexUiState } = useInstantSearch();

  if (!indexUiState.query) {
    return fallback;
  }

  return children;
};

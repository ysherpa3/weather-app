import { Stack } from "@chakra-ui/react";
import algoliasearch from "algoliasearch";
import { ReactElement } from "react";
import {
  InstantSearch,
  InstantSearchSSRProvider,
} from "react-instantsearch-hooks-web";

import { Layout } from "../components/Layout";
import { EmptyQueryBoundary } from "../components/search/EmptyQueryBoundary";
import { CustomHits } from "../components/search/Hits";
import {
  NoResults,
  NoResultsBoundary,
} from "../components/search/NoResultsBoundary";
import { CustomSearchBox } from "../components/search/SearchBox";
import type { NextPageWithLayout } from "./_app";

const searchClient = algoliasearch(
  "UWMFG47AQU",
  "4b7bda5633e848af259cccd7e94d1489"
);

const HomePage: NextPageWithLayout = () => {
  return (
    <InstantSearchSSRProvider>
      <InstantSearch
        searchClient={searchClient}
        indexName="dev_CITIES"
        routing={false}
      >
        <Stack spacing={4} flexGrow="1" maxW={600} py="2rem">
          <CustomSearchBox />
          <EmptyQueryBoundary fallback={null}>
            <NoResultsBoundary fallback={<NoResults />}>
              <CustomHits />
            </NoResultsBoundary>
          </EmptyQueryBoundary>
        </Stack>
      </InstantSearch>
    </InstantSearchSSRProvider>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

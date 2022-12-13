/**
 * Custom algolia search box component
 */

import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { useSearchBox, UseSearchBoxProps } from "react-instantsearch-hooks-web";

export const CustomSearchBox = (props: UseSearchBoxProps) => {
  const { refine } = useSearchBox(props);
  const [search, setSearch] = useState("");

  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<Icon as={AiOutlineSearch} color="gray.700" />}
      />
      <Input
        type="text"
        placeholder="Search for a city..."
        _placeholder={{ color: "gray.600", fontSize: "14px" }}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          refine(e.target.value);
        }}
        bgColor="gray.100"
        color="gray.600"
        boxShadow="md"
      />
      <InputRightElement
        children={<Icon as={AiOutlineClose} color="gray.700" />}
        hidden={search.length < 1}
        onClick={() => {
          setSearch("");
          refine("");
        }}
        cursor="pointer"
        title="Clear the search query"
      />
    </InputGroup>
  );
};

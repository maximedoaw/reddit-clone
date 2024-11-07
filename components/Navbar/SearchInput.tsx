import React from "react";
import { Flex, InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
//import { SearchIcon } from "@chakra-ui/icons";


type SearchInputProps = {
  //user: User;
};

const SearchInput = () => {
  return (
    <Flex
      flexGrow={1}
      mr={2}
      alignItems="center"
    >

      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          color="gray.400"
//          children={<SearchIcon  />}
        />
        <Input
          placeholder="Search Reddit"
          fontSize="10pt"
          border="none"
          _placeholder={{ color: "gray.500" }}
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          height="34px"
          bg="gray.50"
        />
      </InputGroup>
    </Flex>
  );
};
export default SearchInput;
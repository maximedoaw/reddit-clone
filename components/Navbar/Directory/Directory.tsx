import React, { useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { TiHome } from "react-icons/ti";
import {
  Box,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Text,
  Image,
} from "@chakra-ui/react";
import Communities from "./Communities";


const Directory: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen((prev) => !prev)


  return (
    <Menu isOpen={open}>
        
        <>
          <MenuButton
            cursor="pointer"
            padding="0px 6px"
            borderRadius="4px"
            _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
            mr={2}
            ml={{ base: 0, md: 2 }}
            onClick={handleClose}
          >
            <Flex
              alignItems="center"
              justifyContent="space-between"
              width={{ base: "auto", lg: "200px" }}
            >
              <Flex alignItems="center">
                <Icon fontSize={24} mr={{ base: 1, md: 2}} as={TiHome}/>
                <Flex display={{ base: "none", lg:"flex"}}>
                  <Text fontWeight={600} fontSize="10pt">
                    Home
                  </Text>
                </Flex>
              </Flex>
              <ChevronDownIcon color="gray.500" />
            </Flex>
          </MenuButton>
          <MenuList>
            <Communities />
          </MenuList>
        </>
      
    </Menu>
  );
};
export default Directory;
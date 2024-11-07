import { ChevronDownIcon } from '@chakra-ui/icons'
import { FaRedditSquare } from "react-icons/fa";
import { HiOutlineLogin } from "react-icons/hi";
import { VscAccount } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { Flex, Menu, MenuButton, MenuItem, MenuList, Icon, Box, Text } from '@chakra-ui/react'
import { signOut, User } from 'firebase/auth'
import React from 'react'
import { auth } from '@/firebase/clientApp';
import { authModalState } from '@/atoms/authModalAtom';
import { useSetRecoilState } from 'recoil';
import { IoSparkles } from 'react-icons/io5';

type UserMenuProps = {
    user?: User | null
}
const UserMenu : React.FC<UserMenuProps>  = ({ user }) => {
  
    const setModalState = useSetRecoilState(authModalState)
  return (
    <Menu>
        <MenuButton
         cursor="pointer"
         padding="6px 8px"
         borderRadius={4}
         _hover={{ outline: "1px solid", outlineColor:"gray.200"}}
        >
        <Flex alignItems="center">
          <Flex alignItems="center">
            {user ? (
              <>
                <Icon
                  fontSize={24}
                  mr={1}
                  color="gray.300"
                  as={FaRedditSquare}
                />
                <Box
                  display={{ base: "none", lg: "flex" }}
                  flexDirection="column"
                  fontSize="8pt"
                  alignItems="flex-start"
                  mr={8}
                >
                  <Text fontWeight={700}>
                    {user?.displayName || user?.email?.split("@")[0]}
                  </Text>
                  <Flex alignItems="center">
                    <Icon as={IoSparkles} color="brand.100" mr={1} />
                    <Text color="gray.400">1 karma</Text>
                  </Flex>
                </Box>
              </>
            ) : (
              <Icon fontSize={24} mr={1} color="gray.400" as={VscAccount} />
            )}
          </Flex>
          <ChevronDownIcon color="gray.500" />
        </Flex>
        </MenuButton>
        <MenuList>
            {
                user ? (
                    <>
                        <MenuItem>
                                <Flex align="center" _hover={{ outline: "1px solid", outlineColor:"gray.200"}}>
                                    <Icon as={CgProfile} mr={2}/>
                                    Profile
                                </Flex>
                        </MenuItem>
                        <MenuItem
                            onClick={() => signOut(auth)}
                        >
                                <Flex align="center" _hover={{ outline: "1px solid", outlineColor:"gray.200"}}>
                                    <Icon as={HiOutlineLogin} mr={2}/>
                                    Logout
                                </Flex>
                        </MenuItem>
                    </>
                ) : (
                    <>
                        <MenuItem
                            onClick={() => setModalState({ open: true, view: "login"})}
                        >
                                <Flex align="center" _hover={{ outline: "1px solid", outlineColor:"gray.200"}}>
                                    <Icon as={HiOutlineLogin} mr={2}/>
                                    Login / signup
                                </Flex>
                        </MenuItem>
                    </>
                )
            }
        </MenuList>
    </Menu>
  )
}

export default UserMenu

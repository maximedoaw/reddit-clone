import { Flex, Image } from "@chakra-ui/react"
import SearchInput from "./SearchInput"
import RightContent from "../RightContent/RightContent"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/firebase/clientApp"
import Directory from "./Directory/Directory"

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth)
  return (
    <Flex
      bg="white"
      height="44px"
      padding="6px 12px"
      justifyContent={{ md: "space-between" }}
    >
      <Flex
        align="center"
        width={{ base: "40px", md: "auto" }}
        mr={{ base: 0, md: 2 }}
        cursor="pointer"
      >
        <Image src="/images/redditFace.svg" height="30px" />
        <Image
          display={{ base: "none", md: "unset" }}
          src="/images/redditText.svg"
          height="46px"
        />
      </Flex>
      <Directory />
      <SearchInput />
      <RightContent user={user}/>

    </Flex>
  )
}

export default Navbar

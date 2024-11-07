import CreateCommunityModal from '@/components/Modal/CreateCommunity/CreateCommunityModal'
import { Flex, Icon, MenuItem } from '@chakra-ui/react'
import React, { useState } from 'react'
import { GrAdd } from 'react-icons/gr'

type CommunitiesProps = {

}

const Communities : React.FC<CommunitiesProps> = () => {
  const [open, SetOpen] = useState(false)
  const handleClose = () => SetOpen((prev) => !prev)

  return (
    <>
      <CreateCommunityModal open={open} handleClose={handleClose} />
      <MenuItem 
        fontSize="10pt"
        width="100%"
        _hover={{ bg:"gray.100" }}
        onClick={() => SetOpen(true)}
       >
        <Flex align="center">
            <Icon mr={2} as={GrAdd}  fontSize={20}/>
             Create Community
        </Flex>
      </MenuItem>
    </>
  )
}

export default Communities

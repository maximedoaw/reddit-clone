import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    MenuItem,
    Button,
    Box,
    Divider,
    Text,
    Input,
    Stack,
    Checkbox,
    Flex,
    Icon
  } from '@chakra-ui/react'
  import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
  import { HiLockClosed } from "react-icons/hi";
import React , { useState } from 'react'
import { doc, getDoc, runTransaction, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, firestore } from '@/firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';

type CreateCommunityModalProps = {
    open : boolean,
    handleClose : () => void
}

const CreateCommunityModal : React.FC<CreateCommunityModalProps> = ({ open, handleClose }) => {
  const [communityName, SetCommunityName] = useState('')
  const [charsRemaining, SetCharsRemaining] =  useState(21)
  const [communityType, SetCommunityType] = useState('public')
  const [error, SetError] = useState('')
  const [loading, SetLoading] = useState(false)
  const [user] = useAuthState(auth)

  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) =>{
    
    if(event.target.value.length > 21) return
    
    SetCommunityName(event.target.value)
    SetCharsRemaining(21 - event.target.value.length)
  }

  const onCommunityTypeChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
    SetCommunityType(event.target.name)
  }

  const handleCreateCommunity =  async () =>{
    //Validate community name
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;

    if(format.test(communityName) || communityName.length < 3) {
      SetError("Community names must be between 3–21 characters, and can only contain letters, numbers, or underscores.")
      return
    }
    SetLoading(true)
    //Create the comunity name in the firestore
     
    try {
      const communityDocRef = doc(firestore, "communities", communityName)

      await runTransaction(firestore, async (transaction) => {
        //check if community exist
        const communityDoc = await transaction.get(communityDocRef)
        if(communityDoc.exists()){
          throw new Error(`Sorry ${communityName} already exist, try another community name`)
          return
        }   
      
        //Create community
      
      transaction.set(communityDocRef, {
        creatorId: user?.uid,
        createAt: serverTimestamp(),
        numberOfMembers: 1,
        privacyType: communityType
      })

      // create community snippet
      transaction.set(
        doc(firestore, `users/${user?.uid}/communitySnippets`, communityName), {
          communityId : communityName,
          isModerator : true
        }
      )
      })
    
    } catch (error : any) {
      console.log("handleCreateCommuty error : ",error)
      SetError(error.message)
    }

    SetLoading(false)

  }

  return (
    <>


      <Modal isOpen={open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            flexDirection="column"
            fontSize={15}
            padding={2}
          >Create community</ModalHeader>
          <Box>
            <Divider />
            <ModalCloseButton />
            <ModalBody>
                <Text fontWeight={600} fontSize={15}>
                    Name
                </Text>
                <Text>
                     A community name including capitalization cannot be changed 
                </Text>
                <Input
                  position="relative"
                  name="name"
                  value={communityName}
                  onChange={handleChange}
                  pl="22px"
                  type={""}
                  size="sm"
                />
                <Text
                  fontSize="9pt"
                  color={charsRemaining === 0 ? "red" : "gray.500"}
                  pt={2}
                >
                  {charsRemaining} Characters remaining
                </Text>
                <Text>
                  {error}
                </Text>
                <Box>
                  <Stack spacing={2}>
                  <Checkbox
                colorScheme="blue"
                name="public"
                isChecked={communityType === "public"}
                onChange={onCommunityTypeChange}
              >
                <Flex alignItems="center">
                  <Icon as={BsFillPersonFill} mr={2} color="gray.500" />
                  <Text fontSize="10pt" mr={1}>
                    Public
                  </Text>
                  <Text fontSize="8pt" color="gray.500" pt={1}>
                    Anyone can view, post, and comment to this community
                  </Text>
                </Flex>
              </Checkbox>
              <Checkbox
                colorScheme="blue"
                name="restricted"
                isChecked={communityType === "restricted"}
                onChange={onCommunityTypeChange}
              >
                <Flex alignItems="center">
                  <Icon as={BsFillEyeFill} color="gray.500" mr={2} />
                  <Text fontSize="10pt" mr={1}>
                    Restricted
                  </Text>
                  <Text fontSize="8pt" color="gray.500" pt={1}>
                    Anyone can view this community, but only approved users can
                    post
                  </Text>
                </Flex>
              </Checkbox>
              <Checkbox
                colorScheme="blue"
                name="private"
                isChecked={communityType === "private"}
                onChange={onCommunityTypeChange}
              >
                <Flex alignItems="center">
                  <Icon as={HiLockClosed} color="gray.500" mr={2} />
                  <Text fontSize="10pt" mr={1}>
                    Private
                  </Text>
                  <Text fontSize="8pt" color="gray.500" pt={1}>
                    Only approved users can view and submit to this community
                  </Text>
                </Flex>
              </Checkbox>
                  </Stack>
                </Box>
            </ModalBody>
          </Box>
          <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
            <Button 
              variant="outline"
              height="30px"
              colorScheme='blue'
              mr={3} 
              onClick={handleClose}
             >
              Close
            </Button>
            <Button 
              variant='solid'
              height="30px"
              mr={2}
              onClick={handleCreateCommunity}
              isLoading={loading}
            >Create community</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateCommunityModal

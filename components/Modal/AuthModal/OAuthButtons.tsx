import { authModalState } from '@/atoms/authModalAtom'
import { auth, firestore } from '@/firebase/clientApp'
import { Button, Flex, Image, Text } from '@chakra-ui/react'
import { doc, setDoc } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { useSetRecoilState } from 'recoil'

const OAuthButtons: React.FC = () => {
  const setModalState = useSetRecoilState(authModalState)
  const [SignInWithGoogle, userCred, loading, error] = useSignInWithGoogle(auth)
  
  const createUserDocument = async (user : any) =>{
    const userDocRef = doc(firestore, "users", JSON.stringify(userCred?.user))
    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)))
  }

  useEffect(() => {
    if(userCred){
      createUserDocument(userCred.user)
    }
  }, [userCred])

  return (
    <Flex direction="column" width="100%" mb={2}>
      <Button 
        variant="oauth" 
        mb={2} 
        isLoading={loading}
        onClick={() => SignInWithGoogle()}
        >
        <Image src="images/googlelogo.png" height="20px" mr={4}/>
        Continu with Google
      </Button>
      <Button variant="oauth">Some other Provider</Button>
      {error && (<Text color="red.300">{error.message}</Text>)}
    </Flex>
  )
}

export default OAuthButtons
